FROM node:18.9.1-buster-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

ENV PORT=8080
ENV HTTPSPORT=8081

EXPOSE 8080
EXPOSE 8081

CMD ["npm", "start"]