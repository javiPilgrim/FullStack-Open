import  { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
import './index.css'




const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(()=>{
    personService
    .getAll()
    .then(initialList=>{
      setPersons(initialList)
    })
    .catch(error => {
      console.log(error)
    })
  },[])


  const addPerson = (event) => {
    console.log(event)
    const nextPerson = {
      name: newName,
      number: newNumber
    };
    
      const foundPerson = persons.find(person => person.name.toLowerCase() === nextPerson.name.toLowerCase())
    if(foundPerson){
      const result = window.confirm(`${nextPerson.name} is already added on phonebook. replace the old number with a new one?`)
      if(result){
          personService
          .update(foundPerson.id, nextPerson)
          .then(changePerson=> {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : changePerson))
          })
          .catch(error=>{
            setErrorMessage("ERROR: This record no longer appears on the server")
            console.log(error)
            setPersons(persons.filter(person => person.id !== foundPerson.id));
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          setNewName("");
          setNewNumber("");
          setErrorMessage(`INFO: ${foundPerson.name} has changed the number on the phonebook`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      }else{
      setNewName("");
      setNewNumber("");
      }
    }else{
    personService
    .addPerson(nextPerson)
    .then(retornedPerson=>{
      setPersons(persons.concat(retornedPerson));
      setErrorMessage(`INFO: ${nextPerson.name} has been added to the phonebook`)
      setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      setNewName("");
      setNewNumber("");
    })
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
      setErrorMessage(`INFO: ${personDelete.name} has been deleted from the phonebook`)
      setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
    })
    .catch(error=>{setErrorMessage("ERROR: This record no longer appears on the server")
    console.log(error)
    setPersons(persons.filter(person => person.id !== i));
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
      <Notification message={errorMessage} />
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
