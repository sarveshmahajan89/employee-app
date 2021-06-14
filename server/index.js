const express = require('express');

const mongoose = require("mongoose");
const Router = require("./routes");

const username = "admin";
const password = "E1FLc4DWCmJ9ekE0";

const app = express();


app.use(express.json({type: '*/*'}));

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

mongoose.connect(`mongodb+srv://admin:${password}@employee.ulper.mongodb.net/empdb?retryWrites=true&w=majority`, {
    useNewUrlParser: true, useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(Router);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); //The ionic server
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
