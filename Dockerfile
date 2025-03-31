FROM node:18-slim

# Instalar dependencias del sistema necesarias para Puppeteer (Chromium) y otras utilidades, incluyendo unzip
RUN apt-get update && apt-get install -y \
    curl \
    bash \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    unzip \
    chromium \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*


# Instalar Bun
RUN curl -fsSL https://bun.sh/install | bash

# Agregar Bun al PATH
ENV PATH="/root/.bun/bin:$PATH"

# Crear un directorio de trabajo
WORKDIR /app

# Copiar package.json y bun.lock para instalar dependencias
COPY package.json bun.lock ./

# Instalar dependencias con Bun
RUN bun install

# Copiar el código fuente al contenedor
COPY . .

# Copiar el script wait-for-it y darle permisos de ejecución
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Compilar TypeScript a JavaScript (o lo que haga tu build con Bun)
RUN bun run build

# Exponer el puerto de la aplicación (por defecto 3000)
EXPOSE 3000

# Esperar a que MinIO esté disponible y luego iniciar la aplicación
CMD ["/wait-for-it.sh", "minio:9000", "--", "node", "dist/server.js"]
