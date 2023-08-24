## Hal's Deck Builder

This app is a deck building tool for Magic: The Gathering. The frontend was built using React, Redux, and Bootstrap. The backend was built on Express and a Postgres database. Card data is retrieved from [Scryfall](https://scryfall.com/) and [Magicthegathering.io](https://magicthegathering.io/).

#### *Note*
*This project is meant to be a personal one to showcase and practice skills. I am in no way affiliated with Wizards of the Coast nor do I claim to support any of their actions or views.*


## Project Status

This project is currently in development. Users can build decks by searching for cards, create an account, and view player standings.

#### Todo
* General UI cleanup
* Populate card search filters with API data
* Refactor how cards and decks are stored locally (?)
* Add user decks to database
   * Design and implement schema
   * Add deck syncing
   * Intgrate decks and matches in database
     * Add more extensive match history for deck winrates and matchups
* Separate frontend and backend to individual repos

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine. You will also need to run both parts of the app. The frontend runs on port 3000 and the backend on 3001.

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/`
