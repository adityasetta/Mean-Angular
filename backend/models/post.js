const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
          type: String,
          required: true
         }, // read more in mongoose docs : https://mongoosejs.com/docs/guide.html
  content: {
          type: String,
          required: true
         },
  imagePath: { type: String, required: true },
  creator: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Post', postSchema);
