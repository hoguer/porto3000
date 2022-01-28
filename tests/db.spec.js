require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
const { rebuildDB } = require('../db/seedData');
const { createUser, getUser, getUserById, getUserByUsername } = require('../db');
const client = require('../db/client');
