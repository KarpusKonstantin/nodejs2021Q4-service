FROM node:16-alpine

WORKDIR /rs-app

COPY package.json /rs-app

RUN npm install --production

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]
