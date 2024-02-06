import { useState, useEffect } from 'react'
import countryService from './services/countries.jsx'
import Country from './components/country'
import './App.css'


const Countries = ({ countries, handle, showCountry}) => {
  return (
    <>
      {countries.length > 1 && (countries.length > 10 ? (
          <div>Too Many matches, specify another filter</div>
        ) : (
          countries.map((pais) => (
            <div key={pais.name.common}>
              {pais.name.common}{' '}
              <button onClick={()=>{handle(pais.name.common)}} >Ver</button>
              {showCountry === pais.name.common ? (
              <Country
                name={pais.name.common}
                capital={pais.capital}
                population={pais.population}
                languages={pais.languages}
                src={pais.flags.png}
                alt={pais.flags.alt}
                handle={handle}
              />
              ) : null}
            </div>
          ))
        ))}
      {countries.length === 1 && (
        <Country
          name={countries['0'].name.common}
          official = {countries['0'].name.official}
          capital = {countries['0'].capital}
          population = {countries['0'].population}
          languages = {countries['0'].languages}
          src={countries['0'].flags.png}
          alt={countries['0'].flags.alt}

        />
      )}
    </>
  );
};


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


const handleSearch = (event)=> {
  setNewSearch(event.target.value)
  console.log(event.target.value)
}

const handleShowButton = (myCountry)=>{
  setShowCountry(myCountry)
}

const buscar = countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))






return(
  <div>
    <h1>Countries</h1>
    Find Countries: <input type='text' value={newSearch} placeholder="Tu busqueda aqui.." onChange={handleSearch} />
    <Countries countries={buscar} handle={handleShowButton} showCountry={showCountry} />
    
  </div>
)

}



export default App
