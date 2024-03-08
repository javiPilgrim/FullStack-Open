const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

jest.setTimeout(10000)

const initialBlogs = [
  {
    title: "Los chorizos",
    author: "Barcenas",
    url: "http://www.barci.com",
    likes: 1123,
    user: '65e9951b094c3a03d596d801'
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
  test('verify that HTTP POST creates a blog post', async () => {

    const newBlogPost = {
      "title": "Perestroika",
      "author": "Hurtado",
      "url": 'www.apertura.com',
      "likes": 2994,
      "user": '65e9951b094c3a03d596d801'
    }

    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZHJlcyIsImlkIjoiNjVlOTk1MWIwOTRjM2EwM2Q1OTZkODAxIiwiaWF0IjoxNzA5ODkwOTE2fQ.cbtIbEqLU5fvefHbO-3gUFnlN7BkvyvpCXxyREJJkLc'
    
    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const result = await api.get('/api/blogs')
    blogsAtEnd = result.body
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  })

  test('if Post does not have the appropriate authorization responds 401: "Unauthorized"', async () => {

    const newBlogPost = {
      "title": "Ajo y Agua",
      "author": "Pepe Salamino",
      "url": 'www.comidas.com',
      "likes": 8789,
      "user": "65e5afba2e71265ab8757ea9"
    }

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(401)
      .expect('Content-Type', /application\/json/)

  const result = await api.get('/api/blogs')
  blogsAtEnd = result.body
  expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  

  })

test('property likes has 0 by default', async() => {
  const newBlog = {
    title: "Los jueves",
    author: "Enmedio",
    url: "http://www.semanita.com"
  }
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZHJlcyIsImlkIjoiNjVlOTk1MWIwOTRjM2EwM2Q1OTZkODAxIiwiaWF0IjoxNzA5ODkwOTE2fQ.cbtIbEqLU5fvefHbO-3gUFnlN7BkvyvpCXxyREJJkLc'

  await api
  .post('/api/blogs')
  .send(newBlog)
  .set('Authorization', `Bearer ${userToken}`)
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
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZHJlcyIsImlkIjoiNjVlOTk1MWIwOTRjM2EwM2Q1OTZkODAxIiwiaWF0IjoxNzA5ODkwOTE2fQ.cbtIbEqLU5fvefHbO-3gUFnlN7BkvyvpCXxyREJJkLc'


  await api
  .post('/api/blogs')
  .send(newBlog)
  .set('Authorization', `Bearer ${userToken}`)
  .expect(400)
})
})

describe('deleting and modifying blogs', () => {
test('success with status code 204 if it is valid', async () => {
  const result = await api.get('/api/blogs')
  const blogAtStart = result.body
  const blogToDelete = blogAtStart[0]
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZHJlcyIsImlkIjoiNjVlOTk1MWIwOTRjM2EwM2Q1OTZkODAxIiwiaWF0IjoxNzA5ODkwOTE2fQ.cbtIbEqLU5fvefHbO-3gUFnlN7BkvyvpCXxyREJJkLc'

  await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${userToken}`)
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