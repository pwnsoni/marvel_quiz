# marvel_quiz

## Technical Docs

* You can create or join a room.

* Five random questions from a predefined question set would be selected for a particular player, this is stored in a json file in server code itself.

* A redis key would be created when a player joins a room with score 0.

* Every time a user submits the answer, new score of that player would be added in the redis and leaderboard would alse be updated on that user's screen.


## Technology Stack

* Nuxt JS

* Express JS

* Redis (For leaderboard)

* Serverless (For deployment)

* AWS Lambda

## Functional Docs

* Create / join a game with a username

* Make your friend join the same room with different username

* Every time a player submits an answer, leaderboard on that particular player's screen will update.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
