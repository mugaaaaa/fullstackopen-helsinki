const Result = ({ country, setSearch }) => {
  return (
    <li>
      {country.name.common}
      <button onClick={() => setSearch(country.name.common)}>show</button> 
    </li>
  )
}

const Results = ({ countries, setSearch }) => {
  const n = countries.length

  if (n > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (n === 0) {
    return <p>No matches found</p>
  }

  return (
    <ul>
      {countries.map(country => (
        <Result 
          key={country.cca3} 
          country={country} 
          setSearch={setSearch} 
        />
      ))}
    </ul>
  )
}

export default Results
