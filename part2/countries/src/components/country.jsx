

const Country = ({ name, official, capital, population, languages, src, alt }) => {
  const languageValues = Object.values(languages); 
  return (
    <div className="country-container">
      <h2>{name}</h2>
      <p>Official Name: {official}</p>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h5>Languages:</h5>
      <ul>
        {languageValues.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={src} alt={alt}/>
    </div>
  );
};

export default Country;
