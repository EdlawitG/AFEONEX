const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    require: true,
  },
  commenter: {
    type: String,
    require: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
