FROM node:20.11.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/weather-app/browser/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Inicia o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
