import {
	ADD_PROJECT, REMOVE_PROJECT, RENAME_PROJECT,
	ADD_REQUEST, DELETE_REQUEST, UPDATE_REQUEST,
	DUPLICATE_REQUEST, PIN_REQUEST, RENAME_REQUEST,
	DUPLICATE_PROJECT, ADD_FOLDER
} from '../ActionTypes/ProjectActions'

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const ProjectReducer = (state = {}, action) => {
	// Easiest way to copy a nested object
	let stateCopy = JSON.parse(JSON.stringify(state))
	// For creating new projects
	let id = 0
	// For creating and updating
	let request = null

	// Update lastTouched whenever working with a project
	if (action.payload?.id !== undefined && action.type !== DUPLICATE_PROJECT) {
		stateCopy[action.payload.id].lastTouched = Date.now()
	}

	switch (action.type) {
		case ADD_PROJECT:
			Object.keys(stateCopy).map(key => {
				if (key > id) {
					id = Number(key)
				}
				return null
			})
			stateCopy[id+1] = {
				name: action.payload.name,
				lastTouched: Date.now(),
				requests: []
			}
			return stateCopy

		case REMOVE_PROJECT:
			delete stateCopy[action.payload]
			return stateCopy

		case RENAME_PROJECT:
			stateCopy[action.payload.id].name = action.payload.name
			return stateCopy

		case DUPLICATE_PROJECT:
			Object.keys(stateCopy).map(key => {
				if (key > id) {
					id = Number(key)
				}
				return null
			})

			let projectCopy = { ...stateCopy[action.payload.id] }
			stateCopy[id+1] = projectCopy
			stateCopy[id+1].lastTouched = Date.now()
			return stateCopy

		case ADD_REQUEST:
			request = {
				type: 'REQUEST',
				name: action.payload.name,
				method: 'GET',
				url: '',
				bodyType: 'plain_text',
				textBody: '',
				structuredBody: [],
				queries: [],
				pinned: false,
				headers: [],
			}

			if (action.payload.folderId !== undefined) {
				stateCopy[action.payload.id].requests[action.payload.folderId].requests.push({...request})
			} else {
				stateCopy[action.payload.id].requests.push({...request})
			}

			return stateCopy

		case UPDATE_REQUEST:
			request = null
			if (action.payload.folderId !== undefined && action.payload.folderId !== null) {
				request = stateCopy[action.payload.id].requests[action.payload.folderId].requests[action.payload.requestId]
			} else {
				request = stateCopy[action.payload.id].requests[action.payload.requestId]
			}

			request.url = ((action.payload.url !== null) && action.payload.url !== undefined) ? action.payload.url : request.url
			request.method = ((action.payload.method !== null) && action.payload.method !== undefined) ? action.payload.method : request.method
			request.queries = ((action.payload.queries !== null) && action.payload.queries !== undefined) ? action.payload.queries : request.queries
			request.headers = ((action.payload.headers !== null) && action.payload.headers !== undefined) ? action.payload.headers : request.headers
			request.bodyType = ((action.payload.bodyType !== null) && action.payload.bodyType !== undefined) ? action.payload.bodyType : request.bodyType
			request.textBody = ((action.payload.textBody !== null) && action.payload.textBody !== undefined) ? action.payload.textBody : request.textBody
			request.structuredBody = ((action.payload.structuredBody !== null) && action.payload.structuredBody !== undefined) ? action.payload.structuredBody : request.structuredBody

			if (action.payload.folderId !== undefined && action.payload.folderId !== null) {
				stateCopy[action.payload.id].requests[action.payload.folderId].requests[action.payload.requestId] = request
			} else {
				stateCopy[action.payload.id].requests[action.payload.requestId] = request
			}

			return stateCopy;

		case DELETE_REQUEST:
			if (action.payload.folderId !== null && action.payload.folderId !== undefined) {
				stateCopy[action.payload.id].requests[action.payload.folderId].requests.splice(action.payload.requestId, 1)
			} else {
				stateCopy[action.payload.id].requests.splice(action.payload.requestId, 1)
			}
			return stateCopy

		case RENAME_REQUEST:
			if (action.payload.folderId !== null && action.payload.folderId !== undefined) {
				stateCopy[action.payload.id].requests[action.payload.folderId].requests[action.payload.requestId].name = action.payload.newName
			} else {
				stateCopy[action.payload.id].requests[action.payload.requestId].name = action.payload.newName
			}
			return stateCopy

		case PIN_REQUEST:
			if (action.payload.folderId !== null && action.payload.folderId !== undefined) {
				stateCopy[action.payload.id].requests[action.payload.folderId].requests[action.payload.requestId].pinned =
						!stateCopy[action.payload.id].requests[action.payload.folderId].requests[action.payload.requestId].pinned
			} else {
				stateCopy[action.payload.id].requests[action.payload.requestId].pinned = !stateCopy[action.payload.id].requests[action.payload.requestId].pinned
			}
			return stateCopy

		case DUPLICATE_REQUEST:
			if (action.payload.folderId !== null && action.payload.folderId !== undefined) {
				let requestCopy = { ...stateCopy[action.payload.id].requests[action.payload.folderId].requests[action.payload.requestId] }
				stateCopy[action.payload.id].requests[action.payload.folderId].requests.push(requestCopy)
			} else {
				let requestCopy = { ...stateCopy[action.payload.id].requests[action.payload.requestId] }
				stateCopy[action.payload.id].requests.push(requestCopy)
			}
			return stateCopy

		case ADD_FOLDER:
			stateCopy[action.payload.id].requests.push({
				name: action.payload.name,
				color: getRandomColor(),
				type: 'FOLDER',
				requests: []
			})
			return stateCopy

		default:
			return state
	}
}
