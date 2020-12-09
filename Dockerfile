FROM node:14.3.0-alpine3.11@sha256:c3f1683ce9d265e46a414cc2e4bc4e2076a8545e05a3ec2d127450830adccb1a
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm ci
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "start"]