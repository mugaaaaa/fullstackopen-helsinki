const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/phonebook'

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  // name: String,
  // number: String,
  name: {
    type: String, 
    required: true
  },
  number: {
    type: String,
    required: true,
    minLength: 5,
  }
})

// Delete _id and __v, and change _id to id
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)