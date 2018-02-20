'use strict';

import { otherUser } from './project1/User/user.model';

// Find all Users
export function index(req, res) {
  otherUser.find()
    .exec()
    .then(function(users) {
      res.json(users);
    })
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one user
export function show(req, res) {
  otherUser.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      if(existingUser) {
        res.status(200);
        res.json(existingUser);
      } else {
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new user
export function create(req, res) {
  let user = req.body;
  otherUser.create(user)
    .then(function(createdUser) {
      res.status(201);
      res.json(createdUser);
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Update a user
export function update(req, res) {
  var updatedUser;
  otherUser.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      if(existingUser) {
        existingUser.name.firstName = req.body.name.firstName;
        existingUser.name.lastName = req.body.name.lastName;
        existingUser.username = req.body.username;
        existingUser.email = req.body.email;

        updatedUser = existingUser;

        return Promise.all([
          existingUser.increment().save()
        ]);
      } else {
        return null;
      }
    })
    .then(function(savedObjects) {
      if(savedObjects) {
        res.status(200);
        res.json(updatedUser);
      } else {
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a user
export function destroy(req, res) {
  otherUser.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      if(existingUser) {
        return Promise.all([
          existingUser.remove()
        ]);
      } else {
        return null;
      }
    })
    // Delete was successful
    .then(function(deletedUser) {
      if(deletedUser) {
        res.status(204).send();
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

