import { useState, useEffect } from "react"
import axios from 'axios'



const TotalWeather = ({capital}) =>{

const [weather, setWeather] = useState([])
const api_key = import.meta.env.VITE_SOME_KEY;



useEffect(() => {
    axios
      .get(`https://www.meteosource.com/api/v1/free/point?place_id=${capital}&sections=current%2Chourly&timezone=auto&language=en&units=auto&key=${api_key}`)
      .then((response) => {
        setWeather(response.data.current)
      })
      .catch(error=>{
        console.log('fali: ', error)
      })
    }, [])

  return(
    <>
      <h4>Weather:</h4>
      {(weather.length==0) ? (
        <><p> No hay datos meteorologicos </p> </>
      ) : (
        <>
          <p>{weather.summary}</p>
          <p>{weather.temperature}ºC</p>
          <img src={`./src/images/${weather.icon_num}.png`} alt="Imagen del tiempo" />
        </>
      )}
    </>
  )
}

export default TotalWeather