import React, { useState } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';




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
      <Filter newSearch={newSearch} handleFilterChange={handleFilterChange}  />
      <h2>Add a New</h2>
      <PersonForm handleSubmit={handleSubmit}
                  newName={newName}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filterList={nameFilter()} />
    </div>
  );
};

export default App;
