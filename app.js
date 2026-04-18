const express = require('express');
const cors = require('cors');
const passport = require('passport');
const moduleAlias = require('module-alias/register');

const routes = require('./config/routes');
require('./config/mongo')(); // Setup mongo connection

const app = express();

// Passport Config
require('./config/passport')(passport);
app.use(passport.initialize());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

module.exports = app;
