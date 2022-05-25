require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = process.env.PORT;
const secret = process.env.SECRET;

const CreateUser = require('./Routes/Create.User.Route');

app.use(session({ secret: secret }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.use('/user', CreateUser);

app.listen(port, () => {
    console.log("RPG LIBRARY IS RUNNING");
})


