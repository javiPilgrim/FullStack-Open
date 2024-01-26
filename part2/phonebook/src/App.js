import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nextName = {
      name: newName
    }
  const foundPerson = persons.find(person => person.name === nextName.name)
    if(foundPerson){
      console.log("lo ha visto")
      alert(`${nextName.name} is already added on phonebook`)
      setNewName("")
    }else{
      setPersons(persons.concat(nextName))
      setNewName("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      <ul>
        {persons.map((person) => 
          <li key={person.name}>{person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App
