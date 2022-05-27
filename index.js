require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
const secret = process.env.SECRET;

const UserRoute = require('./Routes/User.Route');
const CharacterRoute = require('./Routes/Character.Route');

app.use(cors());
app.use(session({ secret: secret }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.use('/user', UserRoute);
app.use('/character', CharacterRoute);

app.listen(port, () => {
    console.log("RPG LIBRARY IS RUNNING");
})

