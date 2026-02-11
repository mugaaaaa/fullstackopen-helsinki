import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/3.0/weather'
const apiKey = import.meta.env.VITE_API_KEY

const getWeather = (capital) => {
  console.log('API Key:', apiKey); // Debug
  if (!apiKey) {
    return Promise.reject(new Error('Missing VITE_API_KEY'))
  }

  const req = axios.get(`${baseUrl}?q=${encodeURIComponent(capital)}&appid=${apiKey}&units=metric`)
  return req.then(res => res.data)
}

export default { getWeather }
