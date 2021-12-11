FROM node:alpine
WORKDIR /usr/src/app
COPY package* ./
RUN npm ci --only-production
ENV NATS_URL=''
COPY . .
CMD ["node", "index.js"]