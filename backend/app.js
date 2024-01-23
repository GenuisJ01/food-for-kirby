// Has main getter, poster and other required backend server functions. Should export to index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const logger = require("./logger");
const profiles = require("./profiles.json");
const clues = require("./clues.json");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use("/profiles", express.json())

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

app.get('/',(req,res)=>{
    res.status(200).send("Hello!")
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