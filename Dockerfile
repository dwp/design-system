FROM node:14.15.1-alpine3.11@sha256:05a2f563ff66492dbe3c82cb482d6c1bbaecefcac4d42bd3744c7693028c9e44
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm ci
COPY --chown=node:node . .
EXPOSE 3000
CMD [ "npm", "start"]