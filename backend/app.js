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

// app.post('/profiles',(req,res)=>{
//     const profile=req.body;
//     profiles.push(profile)
//     res.status(201).send(profile)
// })

// app.post('/profiles', (req, res) => {
//     const profile = req.body;
//     if (typeof profile === 'object' && profile !== null) {
//         if (
//             'username' in profile &&
//             typeof profile.username === 'string' &&
//             'id' in profile &&
//             typeof profile.id === 'string' &&
//             'progress' in profile &&
//             typeof profile.progress === 'object' &&
//             profile.progress !== null &&
//             'Number of topic attempts' in profile.progress &&
//             typeof profile.progress['Number of topic attempts'] === 'number' &&
//             'Number of lives' in profile.progress &&
//             typeof profile.progress['Number of lives'] === 'number'
//         ) {
//             if (parseInt(profile.id) === profiles.length + 1) {
//                 profiles.push(profile);
//                 res.status(201).send(profile);
//             } else {
//                 res.status(406).send("Invalid 'id' value. It should be equal to the length of the profiles array + 1.");
//             }
//         } else {
//             res.status(406).send("The profile requires a valid 'username', 'id', and 'progress' object with 'Number of topic attempts' (number) and 'Number of lives' (number).");
//         }
//     } else {
//         res.status(400).send("The profile needs to be an object.");
//     }
// });

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

module.exports = {app, port};