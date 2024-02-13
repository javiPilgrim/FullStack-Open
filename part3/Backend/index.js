const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(cors())


let now = new Date()

const newId = () => {
  const numberRandom = Math.floor(Math.random() * 10000) + 1;
  const ids = persons.map(person => person.id)
  return ids.includes(numberRandom)? newId() : numberRandom
};



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get("/info",(request, response)=>{
    response.send(`<p>Phone has info for ${persons.length} people</p>
    <p>${now}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) response.json(person)
  else response.status(404).end()
})


app.get("/api/persons", (request, response)=>{
    response.send(persons)
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  const names = persons.map(person=> person.name.toLowerCase())

  if(!person.name || person.name === ""){
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if(!person.number || person.number === ""){
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if(names.includes(person.name.toLowerCase())){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  person.id = newId()
  persons = persons.concat(person)
  response.json(person)
})


app.delete('/api/persons/:id', (request, response) =>{
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id != id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})