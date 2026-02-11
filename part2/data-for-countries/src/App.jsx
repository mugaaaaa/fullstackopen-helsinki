import { useState, useEffect } from 'react'

import Search from './components/Search'
import Results from './components/Results'
import Detail from './components/Detail'
import searchService from './services/search'

const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const [isUnique, setIsUnique] = useState(false)

  useEffect(() => {
    if (!input.trim()) {
      setCountries([])
      setIsUnique(false)
      return
    }

    searchService
      .find(input)
      .then((data) => {
        setCountries(data)
        setIsUnique(data.length === 1)
      })
  }, [input])


  return (
    <div>
      <Search input={input} setInput={setInput} />
      {isUnique && countries.length === 1
        ? <Detail country={countries[0]} />
        : <Results countries={countries} setSearch={setInput} /> 
      }
    </div>
  )
}

export default App
