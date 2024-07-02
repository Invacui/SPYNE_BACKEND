const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const auth = require('./routes/Users');
const discussions = require('./routes/Discussions');
const interaction = require('./routes/Interaction');

// EXPRESS INIT
const app = express();

// USE MIDDLEWARE
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// EXPRESS ROUTER INSTANCES
app.use('/auth', auth);
app.use('/discussions', discussions);
app.use('/interaction', interaction);

// ENV DATA
dotenv.config({ path: './Private.env' });

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

// DATABASE CONNECTION
mongoose.connect(MONGO_URI, {
  dbName: DB_NAME,
})
.then(() => console.log("Successful login to Mongo Server!!"))
.catch(error => console.log("Failed to login!!", error));

module.exports = app;
