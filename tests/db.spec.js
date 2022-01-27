require('dotenv').config();
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;
const { rebuildDB } = require('../db/seedData');
const { getUserById, getAllActivities, getActivityById, createActivity, updateActivity, getRoutineById, getAllRoutines, getAllPublicRoutines, getAllRoutinesByUser, getPublicRoutinesByUser, getPublicRoutinesByActivity, createRoutine, updateRoutine, destroyRoutine, createUser, getUser, getRoutineActivitiesByRoutine, addActivityToRoutine, updateRoutineActivity, destroyRoutineActivity } = require('../db');
const client = require('../db/client');
