FROM node:8.11.4

ENV HOME=/usr/src/app
ENV NODE_ENV=production

WORKDIR $HOME

COPY client/ $HOME
COPY proto $HOME

RUN npm install --quiet

CMD [ "npm", "start" ]
