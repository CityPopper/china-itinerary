FROM node:24-alpine

RUN npm install --global browser-sync@3

WORKDIR /app
COPY public ./public
COPY src ./src
COPY tools ./tools
RUN chown -R node:node /app

ENV CHOKIDAR_USEPOLLING=true

USER node
EXPOSE 3000

CMD ["node", "tools/dev.mjs"]
