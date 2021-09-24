import { 
	ADD_PROJECT, REMOVE_PROJECT, RENAME_PROJECT,
	ADD_REQUEST, DELETE_REQUEST, ADD_FOLDER, DELETE_FOLDER
} from '../ActionTypes/ProjectActions'

export const ProjectReducer = (state = {}, action) => {
	let stateCopy = JSON.parse(JSON.stringify(state))
	let id = 0

	switch (action.type) {
		case ADD_PROJECT:
			Object.keys(stateCopy).map(key => {
				if (key > id) {
					id = key
				}
				return null
			})
			stateCopy[id+1] = {
				name: action.payload.name,
				requests: []
			}
			return stateCopy

		case REMOVE_PROJECT:
			delete stateCopy[action.payload]
			return stateCopy

		case RENAME_PROJECT:
			stateCopy[action.payload.id].name = action.payload.name
			return stateCopy

		case ADD_REQUEST:
			stateCopy[action.payload.id].requests.push({
				type: 'REQUEST',
				name: action.payload.name,
				method: 'GET',
				url: '',
				bodyType: 'NULL',
				query: [],
				headers: [],
			})
			return stateCopy

		default:
			return state
	}
}