import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PhonebookService from './services/phonebook'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('ok')

  useEffect(() => {
    PhonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Calculate derectly
  const personsToShow = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  const handleAdd = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name === newName)) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }

      const newPerson = {
        name: newName,
        number: newNumber
      }

      PhonebookService
        .update(persons.find(p => p.name === newName).id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
        })
        .catch(err => {
          setNotificationMessage(`Information of ${newName} has already been removed from server`)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== newName))
        })

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    PhonebookService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

    setNotificationMessage(`Added ${newName}`)
    setNotificationType('ok')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleDelete = (id) => {
    if (!window.confirm(`Delete ${persons.find(p => p.id === id).name} ?`)) {
      return
    }

    PhonebookService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const handleFilterChange = (e) => setFilter(e.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={notificationMessage} 
        state={notificationType} 
      />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        handleAdd={handleAdd}
      />

      <h3>Numbers</h3>
      <Persons 
        persons={personsToShow} 
        handleDelete={handleDelete} 
      />
    </div>
  )
}

export default App
