import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () =>  {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const find = (str) =>
  axios.get(baseUrl).then(res =>
    res.data.filter(c =>
      c.name.common
        .toLowerCase()
        .includes(str.toLowerCase())
    )
  )

export default { getAll, find }
