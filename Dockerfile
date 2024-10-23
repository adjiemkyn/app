# frontend/Dockerfile

# Gunakan Node.js sebagai base image untuk build aplikasi React
FROM node:16 AS build

# Buat working directory di dalam container
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Copy semua source code ke dalam working directory
COPY . .

# Build aplikasi React untuk production
RUN npm run build

# Gunakan image Nginx untuk serve static file hasil build React
FROM nginx:alpine

# Copy file build dari stage sebelumnya ke folder yang digunakan Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Ekspose port Nginx
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
