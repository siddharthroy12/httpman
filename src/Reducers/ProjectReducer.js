import { ADD_PROJECT, REMOVE_PROJECT, RENAME_PROJECT } from '../ActionTypes/ProjectActions'

export const ProjectReducer = (state = {}, action) => {
	let stateCopy = {...state}
	let id = 0

	switch (action.type) {
		case ADD_PROJECT:
			for (const key in stateCopy) {
				if (key > id) {
					id = key
				}
			}
			stateCopy[id] = action.payload
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