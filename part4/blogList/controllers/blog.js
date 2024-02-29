const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
  blogRouter.post('/', async(request, response) => {

      const { title, url } = request.body;

      if (!title || !url) {
        return response.status(400).json({ error: 'Title and URL are required' });
      }
      const blog = new Blog(request.body)
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    })

    blogRouter.delete('/:id', async(request, response) => {
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