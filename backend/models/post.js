const mongoose = require('mongoose');

//defintition
const postSchema = mongoose.Schema({
  tittle: {type: String, required: true},
  content: {type: String, required: true}
});


//turning the definition into model
module.exports = mongoose.model('Post', postSchema);
