# Container image that runs your code
FROM node:16.14.2


WORKDIR /var/app/TheCleavageGame

# Copies your code file from your action repository to the filesystem path `/` of the container
COPY node_modules node_modules
COPY public public
COPY build build
COPY package*.json ./

RUN ls

RUN ls ./

# Code file to execute when the docker container starts up
ENTRYPOINT ["node ./build/webServer/main.js"]