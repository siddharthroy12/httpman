export default function generateQueryString(queries) {
	let final = ''
	let queriesFiltered = queries.filter(query => query.name.trim() !== '' && query.value.trim() !== '')

	queriesFiltered.map((query, index) => {
		final += (index !== 0 ? ';' : '') + query.name + '=' + encodeURIComponent(query.value) 
		return null
	})

	return final
}
