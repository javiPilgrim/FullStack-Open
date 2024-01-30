import React from "react"

const Persons = ({filterList})=> {
    return(
      <>
      <ul>
          {filterList.map((person) => (
            <li key={person.name}>{person.name} - {person.number}</li>
          ))}
        </ul>
      </>
    )
  }

  export default Persons;