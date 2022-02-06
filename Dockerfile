FROM node:16-alpine

WORKDIR /rs-app

COPY package.json /rs-app

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]
