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
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profile made, and a total of ${clues.length} topic to pick from!`);
    } else if (profiles.length == 1 && clues.length > 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profile made, and a total of ${clues.length} topics to pick from!`)
    } else if (profiles.length > 1 && clues.length == 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profiles made, and a total of ${clues.length} topic to pick from!`)
    } else if (profiles.length > 1 && clues.length > 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profiles made, and a total of ${clues.length} topics to pick from!`);
    } else {
        res.status(406).send(`Kirby couldn't make it work... The profiles or clues database has an error, and cannot be brought up.`)
    }
})

app.post('/profiles',(req,res)=>{
    const profile=req.body;
    profiles.push(profile)
    res.status(201).send(profile)
})

app.patch('/profiles/', (req, res) => {
    const changes = req.body;
    if (changes.id < profiles.length) {
        const originalProfile = profiles.find((profile) => profile.id == changes.id);

        let changedProfile = originalProfile;
        if (changes.name != originalProfile.name) {
            changedProfile.name = changes.name;
        } 
        if (changes.progress.lives != originalProfile.progress.lives) {
            changedProfile.progress.lives = changes.progress.lives;
        } 
        if (changes.progress.rome != originalProfile.progress.rome) {
            changedProfile.progress.rome = changes.progress.rome;
        } 
        if (changes.progress.renaissance != originalProfile.progress.renaissance) {
            changedProfile.progress.renaissance = changes.progress.renaissance;
        } 
        if (changes.progress.ww1 != originalProfile.progress.ww1) {
            changedProfile.progress.ww1 = changes.progress.ww1;
        } 
        if (changes.progress.ww2 != originalProfile.progress.ww2) {
            changedProfile.progress.ww2 = changes.progress.ww2;
        } 
        if (changes.progress.medicine != originalProfile.progress.medicine) {
            changedProfile.progress.medicine = changes.progress.medicine;
        }

        for (let i = 0; i < profiles.length; i++) {
            if (profiles[i].id == changes.id) {
                profiles[i] = changedProfile;
            }
        }
        res.status(202).send(changedProfile);
    } else {
        res.status(404).send("The profile by that id does not exist!");
    }
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