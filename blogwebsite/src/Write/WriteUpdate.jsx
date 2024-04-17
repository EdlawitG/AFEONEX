import { useState } from "react";
import "./write.css";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../slice/blogSlice";
import { useLocation, useNavigate } from "react-router";
// import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
export default function WriteUpdate() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let blog = location.state;
  const { error, loading } = useSelector((state) => state.blog);
  const [formData, setFormData] = useState({
    title: blog.title,
    excerpt: blog.excerpt,
    image: blog.image,
  });
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [imagebox, setImageBox] = useState(true);

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
    dispatch(updateBlog({ id: blog._id, formData })).then(() => {
      navigate("/");

      if (error) {
        toast.error(error);
      }
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
              selectedFiles ? (
                selectedFiles.map((file, index) => (
                  <img
                    key={index}
                    src={file ? file : `data:image/png;base64,${blog.image}`}
                    onLoad={() => handlePreviewLoad(index)}
                    alt="Preview"
                    className="imageBox"
                  />
                ))
              ) : (
                <img
                  src={`data:image/png;base64,${blog.image}`}
                  alt="Preview"
                  className="imageBox"
                />
              )
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
