// Runs the app and listens to any packages in port

const {app, port} = require("./app");

app.listen(port, () => {
    console.log(`App Listening At Port ${port}.`);
})