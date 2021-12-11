FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci --only-production

COPY . .

CMD ["node", "index.js"]