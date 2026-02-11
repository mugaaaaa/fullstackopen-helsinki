const PersonForm = ({ 
	newName,
	setNewName,
	newNumber,
	setNewNumber,
	handleAdd
 }) => {
	return (
			<form>
			<div>
				name: 
				<input 
					value={newName}
					onChange={
						(event) => {
							event.preventDefault()
							setNewName(event.target.value)
						}
					}
					onClick={
						(event) => {
							event.target.value = ''
						}
					}
				/>
			</div>

			<div>
				number: 
				<input
					value={newNumber}
					onChange={
						(event) => {
							event.preventDefault()
							setNewNumber(event.target.value)
						}
					}
					onClick={
						(event) => {
							event.target.value = ''
						}
					} 
				/>
			</div>

			<div>
				<button 
					type="submit"
					onClick={handleAdd}
				>add</button>
			</div>
		</form>
	)
}

export default PersonForm