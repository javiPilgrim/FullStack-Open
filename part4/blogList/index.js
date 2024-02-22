const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const password = 'mongopilgrim'

const url =
`mongodb+srv://javimacias:${password}@cluster1.f5s3qfz.mongodb.net/blogsList?retryWrites=true&w=majority&appName=Cluster1`

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl =`mongodb+srv://javimacias:mongopilgrim@cluster2.nq61d1f.mongodb.net/blogsList?retryWrites=true&w=majority&appName=Cluster2`

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

/*
let blogs = [
    {
        title: "Los amigos",
        author: "pepe",
        url: "http://www.losamigos.com",
        likes: 123
    },
    {
        title: "Los ajos",
        author: "juanje",
        url: "http://www.losajos.com",
        likes: 222
    }
]
*/

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})
/*
app.post('/api/blogs', (request, response) => {
  const blog = request.body
  console.log(blog)
  response.json(blog)
})
*/

const blog = new Blog({
    title: "Los chorizos",
    author: "Barcenas",
    url: "http://www.barci.com",
    likes: 1123
})

blog.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})