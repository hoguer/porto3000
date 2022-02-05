// This is the Web Server
const express = require('express');
// bring in jwt
const jwt = require('jsonwebtoken');
// bring in secret
require('dotenv').config();
const { JWT_SECRET = "notsosecret" } = process.env;
const { getUserById } = require("./db")

const server = express();

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
server.use(express.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

// Authorization Middleware to jwt.verify and set req.user
server.use(async (req, res, next) => {
  try {
    const auth = req.header('Authorization'); // 'Bearer asdlfkjasdfgljh'
    if(!auth) {
      next();
    } else {
      // get token from auth header
      let [, token] = auth.split(' ');
      token = token.trim();
      console.log('token: ', token); //

      const userObj = jwt.verify(token, JWT_SECRET);
      console.log('userObj: ', userObj);

      // set the user on the request
      req.user = await getUserById(userObj.id);;

      next();
    }
  } catch (error) {
    next(error)
  }
})

// here's our API
server.use('/api', require('./routes'));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// bring in the DB connection
const client = require('./db/client');

// connect to the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${ PORT }!`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!", error);
  }
});
