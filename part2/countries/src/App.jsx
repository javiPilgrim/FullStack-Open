import { useState, useEffect } from 'react'
import countryService from './services/countries.jsx'
import Countries from './components/Countries.jsx'
import './App.css'



function App() {
 const [countries, setCountries] = useState([])
 const [newSearch, setNewSearch] = useState('')
 const [showCountry, setShowCountry] = useState(' ')



 useEffect(() => {
  countryService
    .getAll()
    .then(initialNotes => {
      setCountries(initialNotes)
    })
}, [])


const handleSearch = (event)=> {setNewSearch(event.target.value) }

const handleShowButton = (myCountry)=>{ setShowCountry(myCountry) }

const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))

return(
  <div>
    <h1>Countries</h1>
    Find Countries: <input type='text' value={newSearch} placeholder="Your search here.." onChange={handleSearch} />
    <Countries countries={filterCountries} handle={handleShowButton} showCountry={showCountry} />
  </div>
)}

export default App
