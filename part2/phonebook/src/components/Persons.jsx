import React from "react"


const Persons = ({person, pressButton})=> {

    return(
      <>
 

            <li key={person.id}>
              {person.name} - {person.number}
              <button   onClick={pressButton} >Delete</button>
              </li>


      </>
    )
  }



  export default Persons;