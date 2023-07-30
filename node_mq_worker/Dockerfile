FROM node:16.3.0-alpine
WORKDIR /app
COPY .env /app
COPY package.json /app
COPY index.js /app
# RUN --mount
RUN npm install
CMD ["node", "/app/index.js"]