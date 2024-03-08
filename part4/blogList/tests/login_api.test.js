const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)



test('when make a POST the number blogs increase by one', async() => {
    const initialLogin = {
        username: "Antonio",
        password: "Antonio",
      }
      await api
  .post('/api/login')
  .send(initialLogin)
  .expect(201)
  .expect('Content-Type', /application\/json/)
  const body = request.body
  console.log(body)

  const response = await api.get('/api/login')

})