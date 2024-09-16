import { useState, useEffect } from 'react';
import countryService from './services/countries.jsx';
import Countries from './components/countries.jsx';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const [showCountry, setShowCountry] = useState(' ');
  const [showInfo, setShowInfo] = useState(false); // Nuevo estado para mostrar el texto de información

  useEffect(() => {
    countryService.getAll().then((initialNotes) => {
      setCountries(initialNotes);
    });
  }, []);

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  const handleShowButton = (myCountry) => {
    setShowCountry(myCountry);
  };

  const handleInfoButton = () => {
    setShowInfo(!showInfo); // Alterna la visibilidad del texto de información
  };

  const filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newSearch.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Countries</h1>
      <div className="info-container">
        {/* Botón de información */}
        <button className="info-button" onClick={handleInfoButton}>
          ℹ️nfo
        </button>
        {/* Texto explicativo */}
        {showInfo && (
          <div className="info-text">
            <p><strong>
              Enter the name of the country you want information about in the box. If the name is complete, the information provided will include the weather in its capital. The application offers the countries that match the letters you enter. Please be precise.
              </strong></p>
            <button className="close-button" onClick={handleInfoButton}>
              Close
            </button>
          </div>
        )}
      </div>
      {/* Formulario de búsqueda */}
      <div>
        <label className="search-label">Find Countries:</label>
        <input
          type="text"
          value={newSearch}
          placeholder="Your search here.."
          onChange={handleSearch}
        />
      </div>
      <Countries
        countries={filterCountries}
        handle={handleShowButton}
        showCountry={showCountry}
      />
    </div>
  );
}

export default App;
