const mongoose = require('mongoose');

//defintition
const postSchema = mongoose.Schema({
  tittle: {type: String, required: true},
  content: {type: String, required: true},
  imagePath: {type: String, required: true},
  creator: { type: mongoose.Schema.Types.ObjectId,  ref: "User", required: true}
});


//turning the definition into model
module.exports = mongoose.model("Post", postSchema);
