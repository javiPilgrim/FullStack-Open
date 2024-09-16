import { useState, useEffect } from "react";
import axios from 'axios';

const TotalWeather = ({ capital }) => {
  const [weather, setWeather] = useState(null);  // Cambié de array vacío a null para manejar mejor el estado
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;  // Asegúrate de que el nombre coincide con el del archivo .env

  useEffect(() => {
    if (capital) {
      console.log("Fetching weather data for capital:", capital);
      console.log("Using API key:", import.meta.env); // Verifica si la clave API se está imprimiendo correctamente en la consola

      axios
        .get(`https://www.meteosource.com/api/v1/free/point?place_id=${capital}&sections=current%2Chourly&timezone=auto&language=en&units=auto&key=${api_key}`)
        .then((response) => {
          console.log("Weather data:", response.data);
          setWeather(response.data.current);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [capital, api_key]);  // Asegúrate de agregar capital y api_key como dependencias

  return (
    <div className="weather-container">
      <h4>Weather:</h4>
      {!weather ? (
        <p>No hay datos meteorológicos</p>
      ) : (
        <>
          <p>{weather.summary}</p>
          <p>{weather.temperature}ºC</p>
          <img src={`images/${weather.icon_num}.png`} alt="Imagen del tiempo" />
        </>
      )}
    </div>
  );
}

export default TotalWeather;
