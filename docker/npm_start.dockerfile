FROM node:latest
COPY ../ /var/www
WORKDIR /var/www
ENTRYPOINT ["npm", "start"]
EXPOSE 3000