import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {

    const nextPerson = {
      name: newName,
      number: newNumber
    };

      const foundPerson = persons.find(person => person.name === nextPerson.name)
    if(foundPerson){
      console.log("lo ha visto");
      alert(`${nextPerson.name} is already added on phonebook`);
      setNewName("");
      setNewNumber("");
    }else{
      setPersons(persons.concat(nextPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const nameFilter = () => {
    const personWith = persons.filter((x) =>
      x.name.toLowerCase().includes(newSearch.toLowerCase())
    )
    return personWith
  }

  

  const handleSubmit = (event) => {
    event.preventDefault(); 
    addPerson();
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      filter shown with: <input value={newSearch} onChange={handleFilterChange} />
      <h2>Add a New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /> <br/>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newSearch}</div>
      <ul>
        {nameFilter().map((person) => (
          <li key={person.name}>{person.name} - {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
