const mongoose = require('mongoose');
const uniqueValidator = required("mongoose-unique-validator");

//defintition
const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}

});

userSchema.plugin(uniqueValidator);


//turning the definition into model
module.exports = mongoose.model('User', userSchema);
