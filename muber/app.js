const express = require('express');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

app.use(BodyParser.json());

routes(app);

// Creating middleware to handle error
// Using app.use to register any middleware with Express
// err is the error object from previous step (can be route handler)
// err, req, res are all object; next is a function to call next middleware
app.use((err, req, res, next) => {
  //   console.log(err._message);
  res.status(422).send({ error: err._message });
});

module.exports = app;
