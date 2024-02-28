const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', (request, response, next) => {

      const { title, url } = request.body;

      if (!title || !url) {
        // Si falta el título o la URL, responde con estado 400
        return response.status(400).json({ error: 'Title and URL are required' });
      }
      const blog = new Blog(request.body)
      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
        .catch(error => next(error))
    })

    module.exports = blogRouter