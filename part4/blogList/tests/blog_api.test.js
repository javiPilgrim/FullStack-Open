const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Los chorizos",
    author: "Barcenas",
    url: "http://www.barci.com",
    likes: 1123
  },
  {
    title: "Los amigos",
    author: "pepe",
    url: "http://www.losamigos.com",
    likes: 123
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('all blogs have id property', async() => {
  const response = await api.get('/api/blogs')
  const body = response.body
  body.forEach(blog => {
    expect(blog.id).toBeDefined()
  });
})



afterAll(() => {
  mongoose.connection.close()
})