# Usamos Node.js 18 como base
FROM node:18-alpine

# Creamos un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto en el que corre tu API
EXPOSE 3000

# Comando para levantar la aplicación
CMD ["npm", "start"]
