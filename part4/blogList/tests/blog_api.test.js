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


describe('when there is initially some blogs saved', () => {
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
})

describe('viewing possible errors in new blogs', () => {
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

test('when there is no title or url it responds 400 bad resquest', async() => {
  const newBlog = {
    author: "Enmedio",
    likes: 435
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
})
})

describe('deleting and modifying blogs', () => {
test('success with status code 204 if it is valid', async () => {
  const result = await api.get('/api/blogs')
  const blogAtStart = result.body

  const blogToDelete = blogAtStart[0]

  await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

  const corpFinal = await api.get('/api/blogs')
  const blogsAtEnd = corpFinal.body

  expect(blogsAtEnd).toHaveLength(
      blogAtStart.length - 1
  )

  const contents = blogsAtEnd.map(r => r.id)
  expect(contents).not.toContain(blogToDelete.id)
})

test('success changing the likes of a blog through its Id', async () => {
  const result = await api.get('/api/blogs')
  const blogAtStart = result.body

  const blogToChange = {
    id: blogAtStart[0].id,
    title: blogAtStart[0].title,
    author: blogAtStart[0].author,
    url: blogAtStart[0].url,
    likes: 44
  }
  await api
      .put(`/api/blogs/${blogToChange.id}`)
      .send(blogToChange)
      .expect('Content-Type', /application\/json/)

  const corpFinal = await api.get('/api/blogs')
  const blogsAtEnd = corpFinal.body

  expect(blogsAtEnd[0].likes).toBe(44)
})
})

afterAll(() => {
  mongoose.connection.close()
})