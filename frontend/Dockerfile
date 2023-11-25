# syntax=docker/dockerfile:1

# Create image based on the official Node image from dockerHub
FROM node:lts-buster as base

# Create app directory
WORKDIR /usr/src/app

# Expose the port the app runs in
EXPOSE 5127

# Copy dependency definitions
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

# Install dependencies
RUN yarn

# Get all the code needed to run the app
COPY . /usr/src/app/


# Serve the app
CMD yarn dev

FROM base as dev
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD yarn dev