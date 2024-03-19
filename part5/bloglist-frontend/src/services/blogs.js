import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
};

const delById = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`,config)
  return request.then((response => response.data))
}



const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }

  const newLike =  async (id, newObject) => {
    const config = {
      headers: { Authorization: token },
    }
      const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
      return response.data
    }



export default { getAll, createBlog, setToken, newLike, getById, delById }