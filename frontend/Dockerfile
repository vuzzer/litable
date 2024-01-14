# syntax=docker/dockerfile:1

# Create image based on the official Node image from dockerHub
ARG NODE_VERSION=20.6.1
FROM node:${NODE_VERSION}-alpine as base

# Create app directory
WORKDIR /usr/src/app


FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \ 
    --mount=type=bind,source=package-lock.json,target=package-json.json \
    --mount=type=cache,target=/root/.yarn \
    yarn
COPY . .
CMD ["yarn", "run", "dev"]

