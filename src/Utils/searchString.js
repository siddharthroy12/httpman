// I know this is ugly but it does its job well
function searchString(searchQuery, string) {
	// I want this to be case insensitive
	searchQuery = searchQuery.toUpperCase()
	string = string.toUpperCase()

	let result = false
	let number = 0

	for (let j = 0; j < string.length; j++) { // Try to find the searchQuery in string
		if (searchQuery[0] === string[j]) {
			let passed = true
			let tmp = 0
			let stop = false
			let  i = 0

			for (let k = j; k < string.length && k < searchQuery.length && !stop; k++) {
				if (string[k] !== searchQuery[i]) {
					passed = false
				} else {
					tmp++
				}
				i++
			}

			if (passed) {
				result = true
				if (tmp > number) {
					number = tmp
				}
			}
		}
	}

	if (number < 1) {
		result = false
	}

	return result
}

export default searchString