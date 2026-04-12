# Server Infrastructure Reference

Last updated: 2026-04-05

---

## Machines

### Mini PC — `cepelynvault`

- **OS**: Debian 13 (Trixie), amd64, headless
- **RAM**: 15.38 GB
- **Storage**: SSD
- **Network**: Ethernet (systemd-networkd, DHCP)
- **Network config**: `/etc/systemd/network/20-wired.network`
- **User**: `lynch`
- **Networking**: systemd-networkd (no NetworkManager)
- **DNS**: 1.1.1.1 (in systemd-networkd config and /etc/resolv.conf)
- **Role**: Primary server. Hosts websites and Minecraft server.

### Raspberry Pi — `mc`

- **OS**: Raspbian
- **RAM**: 3.7 GB
- **Storage**: SD card
- **Network**: WiFi
- **User**: `mc`
- **Role**: Network monitoring only. Runs Pi-hole and Uptime Kuma. Completely independent from the mini PC.

---

## Traffic Flow

All public traffic flows through Cloudflare Tunnels. No ports are exposed to the internet (except Minecraft, see below). There is no reverse proxy (no nginx, Caddy, or Traefik in front of anything). There are no local SSL certificates (no Let's Encrypt, no certbot). Cloudflare terminates TLS at the edge and sends traffic through its internal network to the tunnels.

There are two independent Cloudflare Tunnels, one on each machine. This means if the mini PC goes down, the Pi's monitoring services (Uptime Kuma, Pi-hole dashboard) remain accessible, and vice versa.

### How a request reaches a service

```
User browser
  → buenalynch.com (Cloudflare DNS)
  → Cloudflare edge (TLS termination)
  → CNAME lookup determines which tunnel to use
  → Tunnel delivers request to the correct machine
  → cloudflared on that machine forwards to localhost:<port>
  → Docker container serves the response
```

### Which subdomains go where

```
buenalynch.com          → mini PC tunnel → localhost:80   → nginx (portfolio)
www.buenalynch.com      → mini PC tunnel → localhost:80   → nginx (portfolio)
inflamundo.cl           → mini PC tunnel → localhost:8081 → nginx (inflamundo)
www.inflamundo.cl       → mini PC tunnel → localhost:8081 → nginx (inflamundo)
ssh.buenalynch.com      → mini PC tunnel → localhost:22   → SSH server
plants.buenalynch.com   → mini PC tunnel → localhost:3000 → Plantkeeper (frontend nginx → backend API)
todotrack.buenalynch.com → mini PC tunnel → localhost:3002 → todoTrack (frontend nginx → backend API)
ntfy.buenalynch.com     → mini PC tunnel → localhost:2586 → ntfy (push notification server)

uptime.buenalynch.com   → Pi tunnel      → localhost:3001 → Uptime Kuma
pihole.buenalynch.com   → Pi tunnel      → localhost:8080 → Pi-hole web UI
```

Each subdomain has its own CNAME record in Cloudflare DNS pointing to the UUID of the appropriate tunnel. There is no wildcard DNS record. Subdomains are added individually.

### Minecraft (exception)

Minecraft does NOT use Cloudflare Tunnel. It uses traditional port forwarding on the router (port 25565). External players connect via `flanderseuropa.duckdns.org`, a DuckDNS dynamic DNS domain that updates every 5 minutes via cron.

---

## Docker Containers

### On `cepelynvault` (mini PC)

#### buenalynch.com — nginx static site
- **Image**: nginx
- **Port**: 80
- **Hostname via tunnel**: buenalynch.com, www.buenalynch.com
- **Content**: Portfolio site (Vite + React + TypeScript build output)

#### inflamundo.cl — nginx static site
- **Image**: nginx
- **Port**: 8081
- **Hostname via tunnel**: inflamundo.cl, www.inflamundo.cl

#### plants.buenalynch.com — Plantkeeper
- **Images**: nginx (frontend), python:3.11-slim (backend), postgres:16-alpine (database)
- **Ports**: 3000 (frontend), 8000 (backend), 5432 (postgres)
- **Hostname via tunnel**: plants.buenalynch.com
- **Compose file**: `~/repositories/plantcare/docker-compose.yml`
- **Volumes**: `pgdata` (postgres data), `uploads` (plant photos)
- **Repo**: https://github.com/rividall/plantcare.git
- **Notes**: Frontend nginx proxies `/api` and `/uploads` to backend internally. Backend auto-runs Alembic migrations on startup.

#### todotrack.buenalynch.com — todoTrack
- **Images**: nginx (frontend), python:3.11-slim (backend), postgres:16-alpine (database)
- **Ports**: 3002 (frontend), 8002 (backend), 5433 (postgres)
- **Hostname via tunnel**: todotrack.buenalynch.com
- **Compose file**: `~/repositories/todoTrack/docker-compose.yml`
- **Volumes**: `pgdata` (postgres data), `uploads` (todo images)
- **Notes**: Shared TODO app. Frontend nginx proxies `/api` and `/uploads` to backend internally. Backend auto-runs Alembic migrations on startup.

#### ntfy.buenalynch.com — Push Notification Server
- **Image**: binwiederhier/ntfy:latest
- **Port**: 2586
- **Hostname via tunnel**: ntfy.buenalynch.com
- **Compose file**: `~/services/ntfy/docker-compose.yml`
- **Volumes**: `ntfy-cache` (message cache), `ntfy-auth` (user/token DB)
- **Config**: `~/services/ntfy/server.yml`
- **Auth**: deny-all default, admin user with token auth
- **Purpose**: Shared push notification server for all projects. Uses APNs/FCM via ntfy.sh upstream for phone delivery. Projects send notifications via Apprise (Python) using ntfy topic URLs.

#### Minecraft Server — "Flanders"
- **Image**: itzg/minecraft-server
- **Port**: 25565
- **Type**: Paper 1.21.4
- **Memory**: 2560M
- **Compose file**: `~/minecraftServer/flanders/docker-compose.yml`
- **Data volume**: `~/minecraftServer/flanders/data:/data`
- **Container name**: `flanders-minecraft-1`
- **World name**: USW
- **Plugins**: vane-core, ProtocolLib, GriefPrevention, tpa, SetHome, spark
- **External access**: `flanderseuropa.duckdns.org:25565` via DuckDNS + router port forwarding
- **Backups**: Daily at 08:00 via cron, weekly copy on Mondays. Script at `~/minecraftServer/flanders/backups/backup-flanders.sh`. Retains 3 daily + 2 weekly. Backup kicks all players, saves, archives worlds/config, then re-enables saving.

### On `mc` (Raspberry Pi)

Both containers are defined in a single compose file at `~/services/docker-compose.yml`.

#### Pi-hole
- **Image**: pihole/pihole:latest
- **Ports**: 53 (DNS, TCP+UDP), 8080 (web UI)
- **Hostname via tunnel**: pihole.buenalynch.com
- **Config volumes**: `~/services/pihole/etc-pihole`, `~/services/pihole/etc-dnsmasq.d`
- **Purpose**: Network-wide DNS ad blocker. Router DHCP DNS should point to Pi's local IP for all devices to use it.

#### Uptime Kuma
- **Image**: louislam/uptime-kuma:1
- **Port**: 3001
- **Hostname via tunnel**: uptime.buenalynch.com
- **Data volume**: `~/services/uptime-kuma/data`
- **Purpose**: Monitors all services (websites, Minecraft, Cloudflare, external services) and sends notifications when something goes down.

---

## Cloudflare Tunnels — Configuration Files

### Mini PC tunnel: `buenalynch`

**Config**: `/etc/cloudflared/config.yml`

```yaml
tunnel: ddb937a3-98ac-46f8-89fe-9e7970ad9c64
credentials-file: /etc/cloudflared/ddb937a3-98ac-46f8-89fe-9e7970ad9c64.json

ingress:
  - hostname: buenalynch.com
    service: http://localhost:80
  - hostname: www.buenalynch.com
    service: http://localhost:80
  - hostname: inflamundo.cl
    service: http://localhost:8081
  - hostname: www.inflamundo.cl
    service: http://localhost:8081
  - hostname: ssh.buenalynch.com
    service: ssh://localhost:22
  - hostname: plants.buenalynch.com
    service: http://localhost:3000
  - hostname: todotrack.buenalynch.com
    service: http://localhost:3002
  - hostname: ntfy.buenalynch.com
    service: http://localhost:2586
  - service: http_status:404
```

Runs as systemd service: `cloudflared.service`

### Pi tunnel: `pihole-monitor`

**Config**: `/etc/cloudflared/config.yml`

```yaml
tunnel: fd8a52e6-7056-407c-939c-8ae255bbf414
credentials-file: /etc/cloudflared/fd8a52e6-7056-407c-939c-8ae255bbf414.json

ingress:
  - hostname: uptime.buenalynch.com
    service: http://localhost:3001
  - hostname: pihole.buenalynch.com
    service: http://localhost:8080
  - service: http_status:404
```

Runs as systemd service: `cloudflared.service`

---

## Domains

- **buenalynch.com** — DNS zone active in Cloudflare
- **inflamundo.cl** — DNS zone active in Cloudflare
- **Registrar**: NetworkSolutions (transfer to Cloudflare pending)
- **flanderseuropa.duckdns.org** — DuckDNS dynamic DNS for Minecraft

---

## SSH Access

Remote SSH goes through Cloudflare Tunnel using `cloudflared access ssh` as a ProxyCommand. No SSH ports are exposed to the internet.

### Mac SSH config (`~/.ssh/config`):

```
Host cepelynvault-remote
    HostName ssh.buenalynch.com
    ProxyCommand cloudflared access ssh --hostname %h
    User lynch

Host cepelynvault-local
    HostName <minipc-local-ip>
    User lynch

Host raspberry-remote
    HostName ssh-pi.buenalynch.com
    ProxyCommand cloudflared access ssh --hostname %h
    User mc
```

Requires `cloudflared` installed on the Mac.

---

## Repositories

### flanders (Minecraft server)
- **Remote**: https://github.com/rividall/flanders.git (private)
- **Branch**: master
- **Location on mini PC**: `~/minecraftServer/flanders/`
- **Auth**: GitHub CLI (`gh auth login`)
- **Structure**:
  ```
  flanders/                  <- git repo root
  ├── docker-compose.yml
  ├── .gitignore
  ├── backups/
  │   └── backup-flanders.sh
  └── data/                  <- mounted into container as /data
      ├── server.properties
      ├── plugins/
      ├── whitelist.json
      ├── ops.json
      ├── USW/               <- world (gitignored EXCEPT datapacks)
      │   └── datapacks/     <- tracked by git (game logic lives here)
      ├── USW_nether/        <- gitignored
      └── USW_the_end/       <- gitignored
  ```
- **Gitignored**: world region data, jars, cache, libraries, versions, logs, crash-reports, tmp, backup archives
- **Development workflow**: Edit datapacks/configs in VS Code on Mac, push to GitHub, pull on mini PC, `/reload` in-game for datapack changes or `docker compose restart` for plugin/config changes.

---

## Cron Jobs (on `cepelynvault`)

```
*/5 * * * * ~/minecraftServer/duckdns/duck.sh >/dev/null 2>&1
0 8 * * * /home/lynch/minecraftServer/flanders/backups/backup-flanders.sh >> /home/lynch/minecraftServer/flanders/backups/backup.log 2>&1
```

- First job: updates DuckDNS with current public IP every 5 minutes
- Second job: runs Minecraft backup daily at 8 AM, logs output

---

## System Configuration (mini PC)

- **Journald**: persistent logging (`Storage=persistent` in `/etc/systemd/journald.conf`)
- **Kernel panic**: auto-reboot after 10 seconds (`kernel.panic = 10`)
- **Locale**: set via `/etc/default/locale`

---

## Key Answers for LLMs

If you are an AI assistant helping with this infrastructure, here are common questions answered:

- **Is there a reverse proxy?** No. Cloudflare Tunnel handles all ingress directly. No nginx, Caddy, or Traefik sits in front of the services.
- **How is SSL handled?** Entirely by Cloudflare. TLS terminates at Cloudflare's edge. There are no local certificates, no Let's Encrypt, no certbot.
- **Is there a wildcard DNS record?** No. Each subdomain is an individual CNAME record in Cloudflare pointing to the appropriate tunnel UUID.
- **Are any ports exposed to the internet?** Only port 25565 (Minecraft) via router port forwarding. Everything else goes through Cloudflare Tunnels with zero exposed ports.
- **How do I add a new subdomain?** Add a CNAME record in Cloudflare DNS pointing to the tunnel UUID, then add a new ingress rule in the appropriate machine's `/etc/cloudflared/config.yml`, then restart the cloudflared service.
- **How do I deploy changes to the websites?** Build the static site, copy the output into the nginx container's served directory, or rebuild the container.
- **How do I deploy Minecraft datapack changes?** Push to GitHub, pull on mini PC, run `/reload` in-game. No restart needed.
- **How do I deploy Minecraft plugin/config changes?** Push to GitHub, pull on mini PC, run `docker compose restart`.
