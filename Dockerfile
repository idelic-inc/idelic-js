FROM node:20 AS build

ARG NODE_OPTIONS

WORKDIR /packages

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./lerna.json ./
COPY ./.eslintrc ./
COPY ./.prettierrc ./
COPY ./tsconfig.eslint.json ./
COPY ./packages ./packages
COPY ./.yarnrc.yml ./
COPY ./.yarn ./.yarn

ENV NODE_OPTIONS ${NODE_OPTIONS}

RUN yarn install
RUN yarn bootstrap
RUN yarn lint
RUN yarn build
RUN yarn test
