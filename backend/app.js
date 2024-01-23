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

app.post('/profiles',(req,res)=>{
    const profile=req.body;
    profiles.push(profile)
    res.status(201).send(profile)
})

app.get('/',(req,res)=>{
    res.status(200).send("Hello!")
})

app.get('/profiles',(req,res)=>{
    res.send(profiles)
})

app.get('/profiles/:id',(req,res)=>{
    const id = req.params.id;
    const profile = profiles.find((profile) => profile.id == id);
    if (profile==undefined){
        res.status(404).send("This user ID does not exist.");
    } else {
        res.send(profile);
    }
});

module.exports = {app, port};