const mongoose = require('mongoose')

const argv_len = process.argv.length

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/notes'

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const addPerson = (name, number) => {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

const showAllPersons = () => {
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:')
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })

      mongoose.connection.close()
    })
}


switch (argv_len) {
  case 3:
    console.log('Showing all persons in phonebook:')
    showAllPersons()
    break
  case 5:
    console.log('Adding a new person to phonebook:')
    const name = process.argv[3]
    const number = process.argv[4]
    addPerson(name, number)
    break
  default:
    console.log('Invalid number of arguments.')
    mongoose.connection.close()
    process.exit(1)
}


