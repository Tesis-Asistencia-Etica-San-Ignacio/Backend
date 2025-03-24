FROM node:18-alpine 
WORKDIR /app
# Copia los archivos de dependencias y los instala
COPY package*.json ./
RUN bun install
# Copia el resto del proyecto
COPY . .
# Compila el proyecto (usa el script "build" definido en package.json)
RUN bun run build
EXPOSE 3000
CMD ["node", "dist/server.js"]
