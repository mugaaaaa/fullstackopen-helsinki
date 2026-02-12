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

  const notify = (message, type = 'ok') => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

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
          notify(`Updated ${newName}`)
        })
        .catch(err => {
          const message = err.response?.data?.error
          if (message) {
            notify(message, 'error')
            return
          }
          notify(`Information of ${newName} has already been removed from server`, 'error')
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
        notify(`Added ${newName}`)
      })
      .catch(err => {
        const message = err.response?.data?.error ?? 'Failed to add person'
        notify(message, 'error')
      })

  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    const personName = person?.name ?? 'this person'

    if (!window.confirm(`Delete ${personName} ?`)) {
      return
    }

    PhonebookService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))  // Update local date instead of call getAll() again
        notify(`Deleted ${personName}`)
      })
      .catch(err => {
        // 2 '?'s to return undefined safely, '??' to use default String if the left side is null or undefined
        const message = err.response?.data?.error ?? 'Failed to delete person'
        notify(message, 'error')
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
