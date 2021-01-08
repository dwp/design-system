FROM node:14.15.4-alpine3.11@sha256:51e341881c2b77e52778921c685e711a186a71b8c6f62ff2edfc6b6950225a2f
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm ci
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "start"]