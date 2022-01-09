FROM node:16-alpine

WORKDIR /src

COPY package.json /src

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
