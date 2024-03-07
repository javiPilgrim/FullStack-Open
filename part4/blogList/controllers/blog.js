const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async(request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogRouter.post('/', async(request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }   
  const { title, url, author, likes } = request.body;
      
    if (!title || !url) {
      return response.status(400).json({ error: 'Title and URL are required' });
    }
    const user = await User.findById(decodedToken.id)
      console.log("este es el user ",user)
      const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes,
        user: user.id
    })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    })

    blogRouter.delete('/:id', async(request, response) => {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid Token' });
      }
      const blog = await Blog.findById(request.params.id)
      if (!blog) {
        return response.status(404).json({ error: 'Blog no exist' });
      }
      if (blog.user.toString() !== decodedToken.id) {
        return response.status(403).json({ error: 'Dont have permission to delete this blog' });
      }
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
      console.log('blog deleted!')
      
  })

  blogRouter.put('/:id', async(request, response) => {
    const { title, author, url, likes } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id, 
        { title, author, url, likes },
        { new: true, runValidators: true, context: 'query' }
    ) 
        response.json(updatedBlog).status(201)
        console.log('update blog')
        
})

    module.exports = blogRouter