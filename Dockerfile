FROM node:20 AS build

ARG NODE_OPTIONS

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./lerna.json ./
COPY ./.eslintrc ./
COPY ./.prettierrc ./
COPY ./tsconfig.eslint.json ./
COPY ./packages ./packages

ENV NODE_OPTIONS ${NODE_OPTIONS}

RUN corepack enable
RUN yarn set version berry
RUN yarn install
RUN yarn bootstrap
RUN yarn lint
RUN yarn build
RUN yarn test
