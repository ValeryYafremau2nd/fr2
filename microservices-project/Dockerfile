#DEVELOPMENT
FROM node:16-alpine as development
WORKDIR /usr/src/api
COPY tsconfig*.json ./
COPY package*.json ./
RUN npm i
COPY src/ src/
RUN npm run build

#PRODUCTION 0
FROM public.ecr.aws/docker/library/node:lts-slim  as production
WORKDIR /usr/src/api
COPY tsconfig*.json ./
COPY package*.json ./
RUN npm i
COPY src/ src/
RUN npm run build

#PRODUCTION 1
FROM public.ecr.aws/docker/library/node:lts-slim as production1
WORKDIR /usr/src/api
COPY tsconfig*.json ./
COPY package*.json ./
COPY pm2.yaml ./
COPY ecosystem.config.js ./
RUN npm install -g pm2
RUN npm i
COPY src/ src/
RUN npm run build
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
#CMD [ "cd", "api", "&&", "pm2", "start", "pm2.yaml", "-n", "api", "--env", "production" ]