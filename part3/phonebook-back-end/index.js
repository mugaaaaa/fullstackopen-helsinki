// // not so good here :(
// import express from 'express'
// import data from './data.json' assert { type: 'json' }  // need assert from Node.js v21+

const express = require('express')
const data = require('./data.json')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('body', (request) => {
    if (request.method === 'POST') {
        return JSON.stringify(request.body) // for POST requests, return the body in JSON format
    }
    return ''   // for other methods, return empty string
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
    const date = new Date()
    const info = `Phonebook has info for ${data.length} people <br> ${date}`
    response.send(info)
})

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id    // keep it as string because the id in data.json is string
    const person = data.find(p => p.id == id)  

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    if (!data.find(p => p.id === id)) {
        return response.status(404).end()
    } else {
        data.persons = data.persons.filter(p => p.id !== id)    // this didn't realy change the data.json file
        response.status(204).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }

    if (data.find(p => p.name === body.name)) {
        if (window.confirm(`${body.name} is already added to phonebook, replace the old number with a new one?`)) {
            const person = data.find(p => p.name === body.name)
            person.number = body.number
            return response.json(person)
        } else {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
    }

    const id = Math.floor(Math.random() * 1000000)    

    const person = {
        id: id,
        name: body.name,
        number: body.number
    }

    data.push(person)   // this didn't realy change the data.json file
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

