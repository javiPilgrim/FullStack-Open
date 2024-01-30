import React from 'react';


const Filter = ({newSearch, handleFilterChange}) => {
  return(
    <>
       filter shown with: <input value={newSearch} onChange={handleFilterChange} />
    </>
  )
}

export default Filter