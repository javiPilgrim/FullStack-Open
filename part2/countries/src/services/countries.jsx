import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountry = (demand) => {
  const request = axios.get(`${baseUrl}${demand}`)
    return request.then(response=>response.data)
  }

  const getAll = () => {
    const request = axios.get(baseUrl)
      return request.then(response=>response.data)
    }


  



  export default {getAll, getCountry}