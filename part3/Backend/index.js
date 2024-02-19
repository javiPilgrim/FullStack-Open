require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));
morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(cors())

const password = process.argv[2]
let now = new Date()
const url =
  `mongodb+srv://javipilgrim:${password}@cluster1.f5s3qfz.mongodb.net/phonebook?retryWrites=true&w=majority`

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
  Person.find({}).then(persons => {
    response.send(`<p>Phone has info for ${persons.length} people</p>
    <p>${now}</p>`)
})})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person) response.json(person)
  else response.status(404).end()
})


app.get("/api/persons", (request, response)=>{
  Person.find({}).then(persons => {
    response.json(persons)
    console.log(typeof(persons), persons)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body)

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  note.save().then(savedPerson => {
    console.log("Person saved!!")
    response.json(savedPerson)
  })
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