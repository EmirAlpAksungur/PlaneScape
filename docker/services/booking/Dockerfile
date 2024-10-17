FROM node:22-alpine

RUN apk update && apk add bash

WORKDIR /services/booking

COPY ./services/booking ./

RUN npm install

CMD ["node", "index.js"]