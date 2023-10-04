const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const { 
    getHomePage, 
    getUsers, 
    addUser, 
    addExercise,
    getUserLogs,
    deleteUser
} = require('./controller');

router
    .get('/', getHomePage)
    .get('/api/users', getUsers)
    .get('/api/users/:_id/logs', getUserLogs)
    .get('/api/users/:_id/delete', deleteUser);

router
    .post('/api/users', 
        body('username').isString().notEmpty().escape().trim(), 
            addUser)
    .post('/api/users/:_id/exercises',
        body('description').isString().notEmpty().escape().trim(),
        body('duration').isString().notEmpty().escape().trim(),
        body('date').isString().notEmpty().escape().trim(),
            addExercise);

module.exports = router;