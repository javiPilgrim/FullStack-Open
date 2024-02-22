const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())


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





app.get('/api/blogs', (request, response) => {

      response.json(blogs)
    })

app.post('/api/blogs', (request, response) => {
  const blog = request.body
  console.log(blog)
  response.json(blog)


 
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})