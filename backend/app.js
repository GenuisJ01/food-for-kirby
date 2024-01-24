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

app.post('/profiles', (req, res) => {
    const profile = req.body;
    if (
        'username' in profile &&
        'id' in profile &&
        'rome' in profile &&
        'renaissance' in profile &&
        'ww1' in profile &&
        'ww2' in profile &&
        'medicine' in profile &&
        'lives' in profile
        ) {
            if (parseInt(profile.id) === profiles.length+1) {
                profiles.push(profile);
                res.status(201).send(profile);
            } else {
                res.status(406).send(`Invalid id value. It should be equal to ${profiles.length+1}`);
            }
    } else {
        res.status(406).send("The profile requires a valid username, id, number of topic1 attempts and number of lives.");
    }
});

app.get('/', (req, res) => {
    if (profiles.length == 1 && clues.length == 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There is currently ${profiles.length} profile made, and a total of ${clues.length} topic to pick from!`);
    } else if (profiles.length == 1 && clues.length > 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There is currently ${profiles.length} profile made, and a total of ${clues.length} topics to pick from!`)
    } else if (profiles.length > 1 && clues.length == 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profiles made, and a total of ${clues.length} topic to pick from!`)
    } else if (profiles.length > 1 && clues.length > 1) {
        res.status(200).send(`Kirby would like to have a word... He wants to show you this data! There are currently ${profiles.length} profiles made, and a total of ${clues.length} topics to pick from!`);
    } else {
        res.status(406).send(`Kirby couldn't make it work... The profiles or clues database has an error, and cannot be brought up.`)
    }
})

app.patch('/profiles/', (req, res) => {
    const changes = req.body;
    if (changes.id < profiles.length) {
        const originalProfile = profiles.find((profile) => profile.id == changes.id);

        let changedProfile = originalProfile;
        if (changes.name != originalProfile.name) {
            changedProfile.name = changes.name;
        } 
        if (changes.lives != originalProfile.lives) {
            changedProfile.lives = changes.lives;
        } 
        if (changes.rome != originalProfile.rome) {
            changedProfile.rome = changes.rome;
        } 
        if (changes.renaissance != originalProfile.renaissance) {
            changedProfile.renaissance = changes.renaissance;
        } 
        if (changes.ww1 != originalProfile.ww1) {
            changedProfile.ww1 = changes.ww1;
        } 
        if (changes.ww2 != originalProfile.ww2) {
            changedProfile.ww2 = changes.ww2;
        } 
        if (changes.medicine != originalProfile.medicine) {
            changedProfile.medicine = changes.medicine;
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

app.get('/clues',(req,res)=>{
    res.send(clues)
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

app.get('/clues/:topicNum',(req,res)=>{
    const topicNum = req.params.topicNum;
    const clue = clues.find((clue) => clue.topicNum == topicNum);
    // function listAllTopics(data) {
    //     const topics = [];
    //     for (const obj of data) {
    //         topics.push(obj.topic);
    //     }
    
    //     if (topics.length >= 2) {
    //         const lastItem = topics.pop();
    //         return topics.join(', ') + ' or ' + lastItem;
    //     }
    
    //     return topics.join('and');
    // }
    if (clue==undefined){
        res.status(404).send(`This topic number does not exist. Please write a number between 1 and ${clues.length}.`)
    } else {
        res.send(clue)
    }
})

module.exports = {app, port};