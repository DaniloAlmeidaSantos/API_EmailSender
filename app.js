const express = require('express');
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

require("dotenv-safe").config({
    allowEmptyValues: true
});

const emailSender = require('./src/controllers/sendEmail');

const app = express();

app.use(session({
    secret: "DBjhBnmnDB nasadbJHGFDHGSVAd @YTEY#@&Yhb3e7436 BDAHGDYSm DBHSDASD",
    cookie: {
        maxAge: 3000000000
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', emailSender);

app.listen(process.env.EXPRESS_PORT, process.env.EXPRESS_HOST, () => {
    console.log(`Application is running ${process.env.EXPRESS_PORT}...`)
});