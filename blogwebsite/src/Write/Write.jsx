import { useState } from "react";
import "./write.css";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../slice/blogSlice";
import { useNavigate } from "react-router";
export default function Write() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.blog);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    image: null,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagebox, setImageBox] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
      setImageBox(true);
      const file = e.target.files[0];
      setSelectedFiles([URL.createObjectURL(file)]);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePreviewLoad = (index) => {
    URL.revokeObjectURL(selectedFiles[index]); // free memory
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("excerpt", formData.excerpt);
    postData.append("image", formData.image);
    dispatch(createBlog(postData)).then(() => {
      navigate("/");
    });
    setFormData({
      title: "",
      excerpt: "",
      image: null,
    });
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            value={formData.title}
            name="title"
            onChange={handleChange}
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            value={formData.excerpt}
            name="excerpt"
            onChange={handleChange}
            type="text"
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <label htmlFor="fileInput" className="file">
            <i className="writeIcon fas fa-plus"></i>
            {imagebox ? (
              selectedFiles.map((file, index) => (
                <img
                  key={index}
                  src={file}
                  onLoad={() => handlePreviewLoad(index)}
                  alt="Preview"
                  className="imageBox"
                />
              ))
            ) : (
              <p>Add image</p>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
