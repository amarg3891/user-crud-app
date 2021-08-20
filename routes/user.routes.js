const express = require('express')
const router = express.Router()
const controllers = require('../controllers/user.controller.js');
    // Create a new User
    router.post('/user', controllers.create);

    // Retrieve all Users
    router.get('/users', controllers.findAll);

    // Retrieve a single User with userId
    router.get('/user/:userId', controllers.getOne);

    // Update a User with userId
    router.put('/user/:userId', controllers.updateOne);

    // Delete a user with userId
    router.delete('/user/:userId', controllers.delete);


module.exports = router