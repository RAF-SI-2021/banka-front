FROM node:16.14-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

RUN chown -R node:node /app

COPY . .

CMD ["npm", "start"]