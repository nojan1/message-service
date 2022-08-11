FROM node:16-alpine

RUN mkdir /srv/app
WORKDIR /srv/app

COPY . .

RUN npm install --unsafe-perm

ENV DATABASE_FILENAME "/data/database.db"
ENV NODE_ENV production

RUN npm run build

VOLUME [ "/data" ]
EXPOSE 1337
EXPOSE 80

CMD ["npm", "start"]