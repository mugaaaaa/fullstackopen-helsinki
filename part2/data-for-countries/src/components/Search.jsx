const Search = ({ input, setInput }) => {
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <div>
      find countries <input value={input} onChange={handleChange} />
    </div>
  )
}

export default Search