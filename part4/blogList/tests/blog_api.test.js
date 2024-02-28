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
  })
})

test('when make a POST the number blogs increase by one', async() => {
  const newBlog = {
    title: "Los jueves",
    author: "Enmedio",
    url: "http://www.semanita.com",
    likes: 20
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('property likes has 0 by default', async() => {
  const newBlog = {
    title: "Los jueves",
    author: "Enmedio",
    url: "http://www.semanita.com"
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const body = response.body[2]
  expect(body.likes).toBe(0)
})



afterAll(() => {
  mongoose.connection.close()
})