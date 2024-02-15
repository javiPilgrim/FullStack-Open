const mongoose = require('mongoose')

if (process.argv.length<5) {
  console.log('Usage: node mongo.js <password> <name> <number>')
  process.exit(1)
}


const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://javipilgrim:${password}@cluster1.f5s3qfz.mongodb.net/phonebook?retryWrites=true&w=majority`
  

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


const person = new Person({
  name: name,
  number: number,
})

person.save().then(result => {
  console.log(`Added ${name} with number: ${number} to phonebook`)
  mongoose.connection.close()
})
