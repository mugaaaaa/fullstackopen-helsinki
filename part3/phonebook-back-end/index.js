// // not so good here :(
// import express from 'express'
// import data from './data.json' assert { type: 'json' }  // need assert from Node.js v21+

const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person.js')

morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body) // for POST requests, return the body in JSON format
  }
  return ''   // for other methods, return empty string
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.get('/info', (request, response) => {
  Person.find({})
    .then(persons => {
      const data = new Date()
      const info = `Phonebook has info for ${persons.length} people <br> ${data}`
      response.send(info)
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }  // { new: true } to let callback function return updated data
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// --- Error Handle --- 
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } 
  
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
