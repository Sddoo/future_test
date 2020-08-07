FROM node:14-alpine as builder

# install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install --only=prod

WORKDIR /react-frontend
VOLUME /react-frontend

COPY . .

RUN npm run build