# Estágio de compilação
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Estágio de produção
FROM nginx:alpine
COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
