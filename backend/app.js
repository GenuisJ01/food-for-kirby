// Has main getter, poster and other required backend server functions. Should export to index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const logger = require("./logger");
const profiles = require("./profiles.json");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use("/profiles", express.json())

app.use(logger);

app.get('/', (req, res) => {
    res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profile(s) made!`)
})

module.exports = {app, port};