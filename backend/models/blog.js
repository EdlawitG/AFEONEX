const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  excerpt: {
    type: String,
    require: true,
  },
  publicationDate: {
    type: Date,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
