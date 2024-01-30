import React from 'react';

const PersonForm = ({handleSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {

    return(
      <>
        <form onSubmit={handleSubmit}>
          <SetInput name = {newName} 
                    nameChange={handleNameChange} 
                    number = {newNumber} 
                    numberChange={handleNumberChange}/>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }
  
  const SetInput = ({name, nameChange, number, numberChange}) => {
    return(
           <div>
            name: <input value={name} onChange={nameChange} /> <br/>
            number: <input value={number} onChange={numberChange} />
          </div>
    )
  }

  

  export default PersonForm