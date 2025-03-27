FROM node:18-alpine

# Instalar curl y bash
RUN apk add --no-cache curl bash

# Instalar Bun
RUN curl -fsSL https://bun.sh/install | bash

# Agregar Bun al PATH
ENV PATH="/root/.bun/bin:$PATH"

# Crear un directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y bun.lockb
COPY package.json bun.lock ./

# Instalar dependencias con Bun
RUN bun install

# Copiar el código fuente al contenedor
COPY . .

# Compila TS -> JS
RUN bun run build

# Exponer el puerto de la aplicación (puerto que usa Express)
EXPOSE 3000

# Comando para iniciar la aplicación Express con Bun
CMD ["node", "dist/server.js"]
