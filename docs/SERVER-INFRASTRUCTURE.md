# Portfolio (buenalynch.com) -- Server Infrastructure

Last updated: 2026-04-26

## Machine

- **Server**: cepelynvault
- **SSH hostname**: cepelynvault-local
- **Tunnel**: buenalynch

## This App

| Service | Port | Container |
|---------|------|-----------|
| nginx | 80 | portfolio-nginx-1 |

- **Subdomain**: buenalynch.com, www.buenalynch.com
- **Content**: Static site (Vite + React + TypeScript build output)

## Deployment

### Build & run
```
sudo docker compose up -d --build
```

### Docker registry mirror (required — Cloudflare R2 blocked on this host)
`/etc/docker/daemon.json`:
```json
{ "registry-mirrors": ["https://mirror.gcr.io"] }
```
Restart after changing: `sudo systemctl restart docker`

### SCP media before building
Optimized images are gitignored. Copy from local machine before each build that includes new images:
```
scp -r site/public/media/cowork-guide site/public/media/arduino-checklist lynch@cepelynvault-local:~/repositories/buenalynch/site/public/media/
```
For all media at once:
```
scp -r site/public/media/ lynch@cepelynvault-local:~/repositories/buenalynch/site/public/
```

## Notes

Port assignments are managed centrally by the lynch-project-scaffolder skill. If you need to check what other ports are in use across all projects, refer to `_lynchProtocol/SERVER-INFRASTRUCTURE.md` in the parent workspace (not accessible from within this repo).
