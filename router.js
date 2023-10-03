const express = require('express');
const router = express.Router();

const { 
    getHomePage, 
    getUsers, 
    addUser, 
    addExercise,
    getUserLogs
} = require('./controller');

router
    .get('/', getHomePage)
    .get('/api/users', getUsers)
    .get('/api/users/:_id/logs', getUserLogs)

router
    .post('/api/users', addUser)
    .post('/api/users/:_id/exercises', addExercise);

module.exports = router;