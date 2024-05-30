const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blogId = request.params.id;
  const blogs = await Blog.findById(blogId).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;
  const { title, url, author, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: "Title and URL are required" });
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).json({ error: "Blog no exist" });
    }
    if (blog.user.toString() !== request.user.id) {
      return response
        .status(403)
        .json({ error: "Dont have permission to delete this blog" });
    }
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
    console.log("blog deleted!");
  }
);

blogRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes, comments, user } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, comments, user },
    { new: true, runValidators: true, context: "query" }
  );
  response.json(updatedBlog).status(201);
  console.log("update blog");
});

blogRouter.get("/:id/comments", async (request, response) => {
  const blogId = request.params.id;
  const blogs = await Blog.findById(blogId).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs.comments);
});





module.exports = blogRouter;
