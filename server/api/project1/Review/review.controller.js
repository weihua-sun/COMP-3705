'use strict';

import Review from './project1/Review/review.model';
import otherUser from './project1/User/user.model';

export function index(req, res) {
  Review.find()
    .populate('UserCreatingReview')
    .exec()
    .then(function(reviews) {
      res.json(reviews);
    })
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

export function show(req, res) {
  Review.findById(req.params.id)
    .populate('UserCreatingReview')
    .exec()
    .then(function(existingReview) {
      if(existingReview) {
        // User was found by Id
        res.status(200);
        res.json(existingReview);
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


export function create(req, res) {
  let UserCreatingReview = req.body.UserCreatingReview;
  let review = req.body;
  otherUser.create(UserCreatingReview)
    .then(function(createdUserReview) {
      review.UserCreatingReview = createdUserReview;
      return Review.create(review);
    })
    .then(function(createdReview) {
      res.status(201);
      res.json(createdReview);
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}


export function update(req, res) {
  var updatedReview;
  Review.findById(req.params.id)
    .populate('UserCreatingReview')
    .exec()
    .then(function(existingReview) {
      if(existingReview) {
        existingReview.UserCreatingReview.name = req.body.UserCreatingReview.name;
        existingReview.UserCreatingReview.username = req.body.UserCreatingReview.username;
        existingReview.UserCreatingReview.email = req.body.UserCreatingReview.email;
        existingReview.ReviewDescription = req.body.ReviewDescription;
        existingReview.ReviewRating = req.body.ReviewRating;
        existingReview.Date = req.body.Date;

        updatedReview = existingReview;
        return Promise.all([
          existingReview.UserCreatingReview.increment().save(),
          existingReview.increment().save()
        ]);
      } else {
        return null;
      }
    })
    .then(function(savedObjects) {
      if(savedObjects) {
        res.status(200);
        res.json(updatedReview);
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


export function destroy(req, res) {
  Review.findById(req.params.id)
    .populate('UserCreatingReview')
    .exec()
    .then(function(existingReview) {
      if(existingReview) {
        return Promise.all([
          existingReview.remove()
        ]);
      } else {
        return null;
      }
    })
    .then(function(deletedReview) {
      if(deletedReview) {
        res.status(204).send();
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

