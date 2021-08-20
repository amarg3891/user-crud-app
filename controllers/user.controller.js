const User = require('../models/user.model.js');

// Create and Save a new User
User.create = (req, res) => {
    // Validate request
    if(!User) {
        return res.status(400).send({
            message: "No user found"
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name || "User", 
        email: req.body.email,
	   address: req.body.address,
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all users from the database.
User.findAll = (req, res) => {
    User.find()
    .then(User => {
        res.send(User);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some errors occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
User.getOne = (req, res) => {
    User.findById(req.params.userId)
    .then(User => {
        if(!User) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(User);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
User.updateOne = (req, res) => {
    // Validate Request
    if(!User) {
        return res.status(400).send({
            message: "User Not found"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "User", 
        email: req.body.email,
	   address: req.body.address,
    }, {new: true})
    .then(User => {
        if(!User) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        res.send(User);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};
// Delete a user with the specified userId in the request

User.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(User => {
        if(!User) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

module.exports = User
