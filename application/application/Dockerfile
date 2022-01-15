FROM node:13-alpine as build
WORKDIR /app
COPY ./ /app/
RUN npm install -g @ionic/cli
RUN npm install
RUN ionic build
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/www/ /usr/share/nginx/html/
