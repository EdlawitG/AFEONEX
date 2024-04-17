const Blog = require("../models/blog");
const joi = require("joi");
const fs = require("fs");
const { formatDistanceToNow } = require("date-fns");
const { enUS } = require("date-fns/locale");

const blogValidotor = joi.object({
  title: joi.string().required(),
  excerpt: joi.string().required(),
  publicationDate: joi.date().required(),
  author: joi.string().required(),
  image: joi
    .object({
      filename: joi.string().required(),
      mimetype: joi
        .string()
        .valid("image/jpeg", "image/png", "image/webp")
        .required(),
      size: joi
        .number()
        .required(),
    })
    .required(),
});

async function Listallblog(req, res) {
  try {
    const blogs = await Blog.find({}).sort({
      publicationDate: -1,
    });
    return res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
async function GetblogByID(req, res) {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
async function Createblog(req, res) {
  const { title, excerpt } = req.body;
  const publicationDate = new Date();
  const author = req.user.name;
  if (!req.file) {
    return res.status(404).json({ error: "Image can not be empty" });
  }
  const { error } = blogValidotor.validate({
    title: title,
    excerpt: excerpt,
    publicationDate: publicationDate,
    author: author,
    image: {
      filename: req.file.filename,
      mimetype: req.file.mimetype,
      size: req.file.size,
    },
  });
  if (error) {
    return res.status(500).json({ error: error.details[0].message });
  }
  var blog = new Blog();
  blog.title = title;
  blog.excerpt = excerpt;
  blog.publicationDate = publicationDate;
  blog.author = author;
  if (req.file) {
    const { path } = req.file;
    const imageData = await fs.promises.readFile(path);
    const encodedImage = imageData.toString("base64");
    blog.image = encodedImage;
    await fs.promises.unlink(path);
  }
  await blog.save();
  const formattedPublicationDate = formatDistanceToNow(publicationDate, {
    addSuffix: true,
    locale: enUS,
  });

  return res.status(200).json({
    message: "Blog created successfully",
  });
}
async function Updateblog(req, res) {
  const { id } = req.params;
  const { title, excerpt } = req.body;
  // const { error } = blogValidotor.validate({
  //   title: title,
  //   excerpt: excerpt,
  //   image: {
  //     filename: req.file.filename,
  //     mimetype: req.file.mimetype,
  //     size: req.file.size,
  //   },
  // });
  // if (error) {
  //   return res.status(500).json({ error: error.details[0].message });
  // }
  let new_image = "";
  if (req.file) {
    const { originalname, path } = req.file;
    const imageData = await fs.promises.readFile(path);
    const encodedImage = imageData.toString("base64");
    new_image = encodedImage;
    await fs.promises.unlink(path);
  } else {
    new_image = req.body.old_image;
  }
  try {
    const updatedblog = await Blog.findByIdAndUpdate(id, {
      title: title,
      excerpt: excerpt,
      image: new_image,
    });
    if (!updatedblog)
      return res.status(404).send("Blog with specific Id is not Found");
    res.status(200).json({ message: "Blog Updated successfully" });
  } catch (error) {
    console.log(error);
  }
}
async function Deleteblog(req, res) {
  const { id } = req.params;
  const deletedblog = await Blog.findByIdAndDelete(id);
  if (!deletedblog)
    return res.status(404).send("Blog with specific Id is not Found");
  res.status(200).json({ message: "Blog Deleted successfully" });
}

module.exports = {
  Listallblog,
  GetblogByID,
  Createblog,
  Updateblog,
  Deleteblog,
};
