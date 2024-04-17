const Comment = require("../models/comments");
async function CreateComment(req, res) {
  try {
    const { text, blogId } = req.body;
    const newComment = new Comment({
      text,
      blogId: blogId,
      commenter:req.user.name,
    });
    await newComment.save();
    res
      .status(201)
      .json({ success: true, message: "Comment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
async function getCommentsByBlogId(req, res) {
  try {
    const { id } = req.params;
    const comments = await Comment.find({ blog_id: id });
    res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function UpdateComment(req, res) {
  try {
    const { id } = req.params;
    const  {text}  = req.body;
    await Comment.findByIdAndUpdate(id, { text });
    res
      .status(200)
      .json({ success: true, message: "Comment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
async function DeleteComment(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).send("Comment with specific Id is not Found");
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
module.exports = {
  CreateComment,
  getCommentsByBlogId,
  UpdateComment,
  DeleteComment,
};
