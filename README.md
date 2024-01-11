# Anamatic

Welcome to Anamatic, a game where the player has to find as many German words that consist of the given characters as possible. There is no time limit.
The number of points a word is worth depends on two factors: The length of the word, and its rarity.

Words and their rarity are checked using the [DWDS API](https://www.dwds.de/d/api).

## Play Online

You can play the game online at [https://rettertyp.github.io/play-anamatic/](https://rettertyp.github.io/play-anamatic/). Please note that the backend uses a free hosting provider, so it may take a while to start and the words might stay in the blue "pending" box for a bit.

## Development

### Requirements

In order to run the dev-environment, the following requirements should be installed:

- [NodeJS](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [ESLint](https://eslint.org/)
- [prettier](https://prettier.io/)

### Setup

1. Install all dependencies:

```sh
npm i
```

2. Start the dev-environment (watches for file changes):

- To serve both backend and frontend concurrently:

```sh
npm run start
```

- To serve only the frontend:

```sh
npm run start:frontend
```

- To serve only the backend:

```sh
npm run start:backend
```
