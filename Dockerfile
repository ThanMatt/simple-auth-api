FROM node:13-alpine

RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ 

WORKDIR /usr/src/app

COPY package.json .

COPY tsconfig.json .

COPY yarn.lock .

RUN yarn install

RUN yarn global add nodemon

RUN yarn global add typescript

RUN yarn global add ts-node@8.5.2

COPY . .

RUN apk del .gyp

EXPOSE 4000