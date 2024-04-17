import React, { useEffect, useState } from "react";
import { deleteblog, getBlogbyId } from "../slice/blogSlice";
import "./singlepost.css";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  createComment,
  deleteComment,
  getCommentbyId,
  updateComment,
} from "../slice/commentSlice";
import { Link } from "react-router-dom";

function Singlepost() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState("");
  const [input, setInput] = useState(false);
  const [text, setText] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const { loading: commentLoading } = useSelector((state) => state.comment);
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const blogData = await getBlogbyId(blogId);
        const commentData = await getCommentbyId(blogId);
        setBlog(blogData);
        setComments(commentData.comments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [blogId]);

  const handleDelete = async () => {
    try {
      dispatch(deleteblog(blogId));
      toast.success("Blog post deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
       dispatch(deleteComment(id));
      setComments(comments.filter((comment) => comment._id !== id));
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const showInput = () => {
    if (!isLoggedIn) return navigate("/login");
    setInput(true);
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setText(comment.text);
    setInput(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentLoading) return;
    try {
      if (editingComment) {
        dispatch(updateComment({ id: editingComment._id, text }));
        toast.success("Comment updated successfully");
      } else {
        dispatch(createComment({ text, blogId }));
        toast.success("Comment submitted");
      }
      setInput(false);
      setText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error(error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singlepost">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        className="absolute right-0 top-0 mt-20 w-[40px] max-w-sm p-4"
      />
      <div className="singlepostWrapper">
        <img
          src={`data:image/png;base64,${blog.image}`}
          alt=""
          className="singlepostImg"
        />
        <h1 className="singlepostTitle">{blog.title}</h1>
        <div className="singlePostEdit">
          <Link to={{ pathname: `/edit/${blogId}` }} state={blog}>
            <i className="singlePostIcon far fa-edit"></i>
          </Link>
          <i
            className="singlePostIcon far fa-trash-alt"
            onClick={handleDelete}
          ></i>
        </div>

        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">{blog.author}</b>
          </span>
          <span>{blog.publicationDate}</span>
        </div>
        <p className="singlePostDesc">{blog.excerpt}</p>
        <div className="comment">
          <i
            className="commentIcon fa fa-commenting"
            aria-hidden="true"
            onClick={() => showInput()}
          ></i>
          <p className="commenttxt">Add comment here</p>
        </div>
        {input && (
          <form onSubmit={handleSubmit}>
            <div className="commentFormGroup">
              <input
                className="commentInput"
                placeholder="Comment"
                type="text"
                value={text}
                name="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                autoFocus={true}
              />
            </div>
            <button className="commentSubmit" type="submit">
              Send
            </button>
          </form>
        )}
      </div>
      {comments.map((comment) => (
      
        <div className="container">
          <div className="singlepostWrapper">
            <div className="singlePostEdit">
              <i
                className="singlePostIcon far fa-edit"
                onClick={() => handleEditComment(comment)}
              ></i>
              <i
                className="singlePostIcon far fa-trash-alt"
                onClick={() => handleDeleteComment(comment._id)}
              ></i>
            </div>
            <p className="title">{comment.commenter}</p>
            <div className="description">
              <p>{comment.text}</p>
              {console.log(comment)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Singlepost;
