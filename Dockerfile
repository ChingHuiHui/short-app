FROM node:18-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev"]