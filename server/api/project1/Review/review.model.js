import mongoose from 'mongoose';


let Schema = mongoose.Schema;

let reviewsSchema = Schema({

  ReviewDescription: {type: String, required: false},

  ReviewRating: {type: Number, default: 0, min: 0, max: 5, required: true},

 //This should be set by the server
  Date: {type: Date, default: Date.now},

  //implemented as an ObjectId referencing users collection
  UserCreatingReview: {type: Schema.Types.ObjectId, ref: 'User'}
});

let Review = mongoose.model('Review', reviewsSchema);


export {Review};
