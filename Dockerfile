FROM node:14.15.2-alpine3.11@sha256:3354c7dfe324bbe3e72dfc9a124c4c86ebceab36ee403333c70e91b37510be1d
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm ci
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "start"]