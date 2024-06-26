const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 5,
        required: true
    },
    author: {
        type: String,
        minLength: 3,
        required: true
    },
    url: {
        type: String,
        minLength: 5,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
      type: String,
      default: []
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Blog', blogSchema)