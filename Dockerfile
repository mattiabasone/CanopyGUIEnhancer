FROM node:14-alpine

RUN npm install --global gulp-cli

USER node
WORKDIR /cge

CMD ["/bin/ash"]