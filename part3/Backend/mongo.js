const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('usage: node mongo.js <password> or node mongo.js <password> <name> <number>')
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

if(name && number){
const person = new Person({
  name: name,
  number: number,
})

person.save().then(result => {
  console.log(`Added ${name} with number: ${number} to phonebook`)
  mongoose.connection.close()
})

}else{

Person.find({}).then(result => {
  console.log('phonebook: ')
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
}
