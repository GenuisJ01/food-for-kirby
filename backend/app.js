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

module.exports = {app, port};