FROM node:22-alpine

RUN apk update && apk add bash curl

WORKDIR /services/iata

COPY ./services/iata ./ 

RUN npm install

RUN chmod +x /services/iata/wait-for-elasticsearch.sh

CMD ["/services/iata/wait-for-elasticsearch.sh", "node", "index.js"]