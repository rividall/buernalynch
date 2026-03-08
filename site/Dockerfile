# Stage 1: Build
FROM node:22-slim AS build
WORKDIR /app

# Install deps first (cached unless package files change)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source content and scripts (public/media/ is pre-optimized locally and SCP'd)
COPY content/ content/
COPY scripts/ scripts/
COPY src/ src/
COPY public/ public/
COPY index.html tsconfig*.json vite.config.ts ./

# Build content metadata then Vite build
# NOTE: We call tsc + vite directly instead of "npm run build" because
# npm auto-runs "prebuild" which re-runs optimize-images.ts with no source
# images, overwriting the pre-generated image-manifest.ts with an empty one.
RUN npx tsx scripts/build-content.ts && npx tsc -b && npx vite build

# Stage 2: Serve
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
