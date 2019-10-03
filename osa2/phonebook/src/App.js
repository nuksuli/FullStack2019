import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'
import './App.css'
import { setTimeout } from 'timers'

const Filter = ({ value, onChange }) => {
  return (
    <form>
      <div>
        filter shown with<input
          onChange={onChange}
          value={value}
        />
      </div>
    </form>
  )
}
const PersonForm = ({ onSubmit, onNumChange, onNameChange, num, name }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input
          value={name}
          onChange={onNameChange}
        />
      </div>
      <div>
        number: <input
          value={num}
          onChange={onNumChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </div>
    </form>
  )
}

const Persons = ({ personDelete, persons, filt }) => {
  const personsToShow =
    filt === ''
      ? persons
      : persons.filter(person =>
        person.name.toUpperCase().includes(filt.toUpperCase()))

  return (
    personsToShow.map(person =>
      <p key={person.id}>
        {person.name} {person.number}
        <button value={person.id} onClick={personDelete}>delete</button>
      </p>)

  )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div>
      <h1 className={type}>{message}</h1>
    </div>
  )

}



const App = () => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filt, setFilt] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const personDelete = event => {
    if (window.confirm(`Do you want to delete this person?`)) {
      personService
        .deletePerson(event.target.value)
      setPersons(persons.filter(p => parseInt(event.target.value) !== p.id))
      setMessage('Person deleted!')
      setType('deleteNotification')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 2000);
    }
  }


  const addPerson = (event) => {
    const personObject =
    {
      name: newName,
      number: newNum,
    }
    event.preventDefault()


    if (persons.some(person =>
      (person.name === newName))) {
      if (window.confirm(`${newName} is already added to phonebook, do you want to update his/her number?`)) {
        const personToupdate = persons.find(person => person.name === newName)
        const changedPerson = { ...personToupdate, number: newNum }
        personService
          .update(changedPerson.id, changedPerson).then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
              .catch(error => {
                setType('deleteNotification')
                setMessage(`${personToupdate.name} is already deleted from the server`)
                setTimeout(() => {
                  setMessage(null)
                  setType(null)
                  return;
                })
              })
          }
          )
        setMessage(`Number for ${personToupdate.name} has been updated!`)
        setNewNum('')
        setNewName('')
        setType("updateNotification")
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 2000)
      }

    }

    else {
      personService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))

      setNewName('')
      setNewNum('')
      setType("addNotification")
      setMessage(`${personObject.name} added!`)
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 2000)
    }
  }
  const handleFilter = (event) => {
    setFilt(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        type={type}
      />
      <Filter value={filt}
        onChange={handleFilter}
      />
      <h3>add a new contact</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        num={newNum}
        onNameChange={handleNameChange}
        onNumChange={handleNumChange}
        personDelete={personDelete}
      />
      <h3>Numbers</h3>
      <Persons
        personDelete={personDelete}
        persons={persons}
        filt={filt} />
    </div>
  )

}

export default App;