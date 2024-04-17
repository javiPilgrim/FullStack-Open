require('dotenv').config()

console.log('NODE_ENV:', process.env.NODE_ENV) // Imprime el valor de NODE_ENV
console.log('TEST_MONGODB_URI:', process.env.TEST_MONGODB_URI) // Imprime el valor de TEST_MONGODB_URI
console.log('MONGODB_URI:', process.env.MONGODB_URI) // Imprime el valor de MONGODB_URI

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

console.log('Selected MONGODB_URI:', MONGODB_URI) // Imprime el valor de MONGODB_URI que se ha seleccionado

module.exports = {
    PORT,
    MONGODB_URI
}