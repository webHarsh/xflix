const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const routes = require('./routes/v1')

app.use(helmet());

// parse json request body
app.use(express.json());
 
// parse urlencoded request body 
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());   

// enable cors
app.use(cors());
app.options("*", cors());


app.use('/v1', routes)


module.exports = app

 