import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let nameSchema = Schema({
  // firstName is a simple String type that is required
  firstName: {type: String, required: true},

  // lastName is a simple String type that is required
  lastName: {type: String, required: true}
});

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

let userSchema = Schema({
  //Implemented as a subdocument Required attributes:First name Last name
  FullName: nameSchema,

  Username: {type: String, unique: true, required: true},

  EmailAddress: {type: String, trim: true, lowercase: true, unique: true, required: true, validate: [validateEmail, 'please fill a valid email address']}
});

let otherUser = mongoose.model('otherUser', userSchema);

export {otherUser};
