import { ADD_PROJECT, REMOVE_PROJECT, RENAME_PROJECT } from '../ActionTypes/ProjectActions'

export const ProjectReducer = (state = {}, action) => {
	let stateCopy = {...state}
	let id = 0

	switch (action.type) {
		case ADD_PROJECT:
			Object.keys(stateCopy).map(key => {
				if (key > id) {
					id = key
				}
				return null
			})
			stateCopy[id+1] = action.payload
			return stateCopy
		case REMOVE_PROJECT:
			delete stateCopy[action.payload]
			return stateCopy
		case RENAME_PROJECT:
			stateCopy[action.payload.id].name = action.payload.name
			return stateCopy
		default:
			return state
	}
}