import { 
	ADD_PROJECT, REMOVE_PROJECT, RENAME_PROJECT,
	ADD_REQUEST, DELETE_REQUEST, UPDATE_REQUEST,
	DUPLICATE_REQUEST, PIN_REQUEST, RENAME_REQUEST,
	ADD_FOLDER, DELETE_FOLDER,
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
				pinned: false,
				headers: [],
			})
			return stateCopy
		
		case UPDATE_REQUEST:
			stateCopy[action.payload.id]
				.requests[action.payload.requestId]
					.url = (action.payload.url !== null) || action.payload.url !== undefined ?
						action.payload.url : stateCopy[action.payload.id].requests[action.payload.requestId].url
			stateCopy[action.payload.id]
				.requests[action.payload.requestId]
					.method = (action.payload.method !== null) || action.payload.method !== undefined ?
						action.payload.method : stateCopy[action.payload.id].requests[action.payload.requestId].method
			stateCopy[action.payload.id]
				.requests[action.payload.requestId]
					.query = (action.payload.query !== null) || action.payload.query !== undefined ?
						action.payload.query : stateCopy[action.payload.id].requests[action.payload.requestId].query
			stateCopy[action.payload.id]
				.requests[action.payload.requestId]
					.headers = (action.payload.headers !== null) || action.payload.headers !== undefined ?
						action.payload.headers : stateCopy[action.payload.id].requests[action.payload.requestId].headers

			return stateCopy;

		case DELETE_REQUEST:
			stateCopy[action.payload.id].requests.splice(action.payload.requestId, 1)
			return stateCopy
		
		case RENAME_REQUEST:
			stateCopy[action.payload.id].requests[action.payload.requestId].name = action.payload.newName
			return stateCopy
		
		case PIN_REQUEST:
			stateCopy[action.payload.id].requests[action.payload.requestId].pinned = !stateCopy[action.payload.id].requests[action.payload.requestId].pinned
			return stateCopy
		
		default:
			return state
	}
}