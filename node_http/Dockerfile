FROM node:16.3.0-alpine
WORKDIR /app
COPY .env /app
COPY MqBroker.js /app
COPY package.json /app
COPY server.js /app
COPY /static /app/static
# RUN --mount
RUN npm install
CMD ["node", "/app/server.js"]
EXPOSE 8080