FROM node:22-alpine

RUN apk update && apk add bash

WORKDIR /services/proxy

COPY ./services/proxy ./

RUN npm install

CMD ["node", "index.js"]