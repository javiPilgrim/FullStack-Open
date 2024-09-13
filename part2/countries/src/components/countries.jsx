import Country from "./country"
import TotalWeather from "./weather"

const Countries = ({ countries, handle, showCountry}) => {
    return (
      <>
        {countries.length > 1 && (
  countries.length > 10 ? (
    <div className="notification">Too Many matches, specify another filter</div>
  ) : (
    countries.map((pais) => (
      <div key={pais.name.common}>
        {pais.name.common}{' '}
        <button onClick={() => handle(pais.name.common)}>Ver</button>
        {showCountry === pais.name.common ? (
          <Country
            name={pais.name.common}
            official={pais.name.official}
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
  )
)}

        {countries.length === 1 && (
          <>
          <Country
            name={countries['0'].name.common}
            official = {countries['0'].name.official}
            capital = {countries['0'].capital}
            population = {countries['0'].population}
            languages = {countries['0'].languages}
            src={countries['0'].flags.png}
            alt={countries['0'].flags.alt}
          />
          <TotalWeather capital={countries['0'].capital} />
        </>
        )}
      </>
    );
  };

  export default Countries
