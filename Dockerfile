# Estágio de construção
FROM node:20.11.1 AS build

 WORKDIR /app

 COPY package*.json ./

 RUN npm install

 COPY . .

 RUN npm run build --prod

# Estágio de produção
FROM nginx:alpine

 COPY --from=build /app/dist/weather-app/browser/ /usr/share/nginx/html

 EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
