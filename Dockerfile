# Stage 1: Builder
FROM oven/bun:latest AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install
COPY . .
RUN bun run build

# Stage 2: Runtime
FROM node:18-slim AS runtime
WORKDIR /app

# Instalar solo libs para Puppeteer/EJS
RUN apt-get update && apt-get install -y \
  fonts-liberation libatk1.0-0 libatk-bridge2.0-0 libcups2 \
  libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 libnss3 \
  libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 \
  xdg-utils chromium unzip ca-certificates \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist        ./dist
COPY --from=builder /app/node_modules ./node_modules

#COPY wait-for-it.sh ./
#RUN chmod +x wait-for-it.sh

EXPOSE 3000
CMD ["node", "dist/server.js"]