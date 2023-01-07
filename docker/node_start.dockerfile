FROM node:latest
COPY ../ /var/www
WORKDIR /var/www
EXPOSE 3000
