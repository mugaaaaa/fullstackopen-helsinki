import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Detail = ({ country }) => {
  if (!country) {
    return null
  }

  const name = country.name.common
	const capital = country.capital?.[0]	// optional chaining
	const area = country.area
	const languages = Object.values(country.languages)
	const flag = country.flags.png
	const alt = country.flags.alt || `Flag of ${name}`

	const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(false)

	useEffect(() => {
		if (capital) {
      setWeatherError(false)
      weatherService
        .getWeather(capital)
        .then(setWeather)
        .catch(() => {
          setWeather(null)
          setWeatherError(true)
        })
		}
	}, [capital])

	return (
		<div>
			<h2>{name}</h2>
			<p>capital {capital}</p>
			<p>area {area}</p>
			<h3>languages:</h3>
			<ul>
				{languages.map(lang => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<img src={flag} alt={alt} />
			{weather && (
				<div>
					<h3>Weather in {capital}</h3>
					<p>Temperature: {weather.main.temp} Celsius</p>
					<p>Wind Speed: {weather.wind.speed} m/s</p>
				</div>
			)}
      {weatherError && (
        <p>Weather data is unavailable.</p>
      )}
		</div>
	)
}

export default Detail
