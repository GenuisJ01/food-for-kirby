// Has main getter, poster and other required backend server functions. Should export to index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const logger = require("./logger");
const profiles = require("./data/profiles.json");
const clues = require("./data/clues.json");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use("/profiles", express.json());
app.use("/clues", express.json());

app.use(logger);

app.get('/', (req, res) => {
    if (profiles.length == 1 && clues.length == 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profile made, and a total of ${clues.length} clue to pick from!`);
    } else if (profiles.length == 1 && clues.length > 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profile made, and a total of ${clues.length} clues to pick from!`)
    } else if (profiles.length > 1 && clues.length == 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profiles made, and a total of ${clues.length} clue to pick from!`)
    } else if (profiles.length > 1 && clues.length > 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profiles made, and a total of ${clues.length} clues to pick from!`);
    } else {
        res.status(406).send(`Kirby couldn't make it work... The profiles or clues database has an error, and cannot be brought up.`)
    }
})

module.exports = {app, port};