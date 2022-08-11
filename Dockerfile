FROM node:16-alpine

RUN mkdir /srv/app
WORKDIR /srv/app

COPY . .

RUN npm install --unsafe-perm

ENV DATABASE_FILENAME "/data/database.db"
ENV APP_KEYS [key1asda, key2fadsf]
ENV NODE_ENV production

RUN npm run build

VOLUME [ "/data" ]
EXPOSE 1337

CMD ["npm", "start"]