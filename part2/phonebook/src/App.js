import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personService from './services/persons';





const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('')

  useEffect(()=>{
    personService
    .getAll()
    .then(initialList=>{
      console.log('llega promesa')
      setPersons(initialList)
    })
  },[])


  const addPerson = (event) => {
    const nextPerson = {
      name: newName,
      number: newNumber
    };
    
      const foundPerson = persons.find(person => person.name === nextPerson.name)
    if(foundPerson){
      alert(`${nextPerson.name} is already added on phonebook`);
      setNewName("");
      setNewNumber("");
    }else{
    personService
    .addPerson(nextPerson)
    .then(retornedPerson=>{
      setPersons(persons.concat(retornedPerson));
      setNewName("");
      setNewNumber("");
    });
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

  const deleteButton = (i) => {
    console.log(`Has borrado la etiqueta ${i}`)
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
      <ul>
      {nameFilter().map((person,i) => (
      <Persons  key={i} person={person} pressButton ={()=>deleteButton(person.id)} />
      ))}
      </ul>
    </div>
  );
};

export default App;
