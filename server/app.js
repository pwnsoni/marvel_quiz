require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');



const router = express.Router();
const routes = require('./routes/index.js');

// Import and Set Nuxt.j{

app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());
app.use('/api', routes(router));
  // Listen the server

module.exports = {app, express}
