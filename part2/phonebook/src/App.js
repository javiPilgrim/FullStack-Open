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
      setPersons(initialList)
    })
  },[])


  const addPerson = (event) => {
    const nextPerson = {
      name: newName,
      number: newNumber
    };
    
      const foundPerson = persons.find(person => person.name.toLowerCase() === nextPerson.name.toLowerCase())
    if(foundPerson){
      const result = window.confirm(`${nextPerson.name} is already added on phonebook. replace the old number with a new one?`)
      if(result){
          console.log(`Foundperson: `, foundPerson, "nextperson: ", nextPerson)
          personService
          .update(foundPerson.id, nextPerson)
          .then(changePerson=> {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : changePerson))
          })
          setNewName("");
          setNewNumber("");
      }else{
      setNewName("");
      setNewNumber("");
      }
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
    const name = persons.filter(person => person.id === i)
    const result = window.confirm(`Do you want to delete ${name[0].name}`)
    if(result){
    personService
    .deletePerson(i)
    .then(personDelete =>{
      console.log(personDelete)
      setPersons(persons.filter(person => person.id !== i));
    })
  }
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
