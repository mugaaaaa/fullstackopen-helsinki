import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

// This return the data directly instead of a promise
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// If attribute and value have the same name, we can write only one of them
export default {
  getAll,
  create,
  update
}