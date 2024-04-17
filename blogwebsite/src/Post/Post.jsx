import React, { useEffect, useState } from "react";

import "./post.css";
import { getAllBlog } from "../slice/blogSlice";
import { Link } from "react-router-dom";
function Post() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getAllBlog();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching job posts:", error);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="post">
      {blogs.map((blog) => (
        <div key={blog._id} className="postwrap">
          <Link
            to={`/blog/${blog._id}`}
            key={blog._id}
            style={{ textDecoration: "none" }}
          >
            <img
              src={`data:image/png;base64,${blog.image}`}
              alt=""
              className="postImg"
            />
          </Link>
          <div className="postInfo">
            <div className="postCats">
              <span className="postCats">Music</span>
              <span className="postCats">Life</span>
              <span className="postCats">Random</span>
              <span className="postCats">Personal thougths</span>
            </div>
            <span className="postTitle">{blog.title}</span>
            <hr />
            <span className="postData">{blog.publicationDate}</span>
          </div>
          <p className="postDesc">{blog.excerpt}</p>
        </div>
      ))}
    </div>
  );
}

export default Post;
