const express = require("express");
const { Register, Login, Logout } = require("../controllers/user-controllers");
const {
  Listallblog,
  Createblog,
  Updateblog,
  Deleteblog,
  GetblogByID,
} = require("../controllers/blog-controllers");
const { isAuthenticated } = require("../helpers/auth");
const router = express.Router();
const upload = require("../helpers/multer");
const {
  getCommentsByBlogId,
  CreateComment,
  DeleteComment,
  UpdateComment,
} = require("../controllers/comment-controllers");
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/listofblogs", Listallblog);
router.get("/getblog/:id", GetblogByID);
router.post("/createblog", isAuthenticated, upload.single("image"), Createblog);
router.put(
  "/updateblog/:id",
  isAuthenticated,
  upload.single("image"),
  Updateblog
);
router.delete("/deleteblog/:id", isAuthenticated, Deleteblog);
router.get("/getcomment/:id", getCommentsByBlogId);
router.post("/createcomment", isAuthenticated, CreateComment);
router.put("/updatecomment/:id", isAuthenticated, UpdateComment);
router.delete("/deletecomment/:id", isAuthenticated, DeleteComment);
module.exports = router;
