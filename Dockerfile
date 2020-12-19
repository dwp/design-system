FROM node:14.15.3-alpine3.11@sha256:bef791f512bb4c3051a1210d7fbd58206538f41eea9b966031abc8a7453308fe
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm ci
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "start"]