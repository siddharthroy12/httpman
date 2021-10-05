import { ADD_PROJECT, ADD_REQUEST, DELETE_REQUEST, REMOVE_PROJECT, RENAME_PROJECT, RENAME_REQUEST, UPDATE_REQUEST } from '../ActionTypes/ProjectActions'

export const addProject = (name) => async (dispatch) => {
	dispatch({
		type: ADD_PROJECT,
		payload: {
			name
		}
	})
}

export const removeProject = (id) => async (dispatch) => {
	dispatch({
		type: REMOVE_PROJECT,
		payload: id
	})
}

export const renameProject = (id, name) => async (dispatch) => {
	dispatch({
		type: RENAME_PROJECT,
		payload: {
			id,
			name
		}
	})
}

export const addRequest = (id, name) => async (dispatch) => {
	dispatch({
		type: ADD_REQUEST,
		payload: {
			id, name
		}
	})
}

export const updateRequest = (id, requestId, url, method, query, headers) => async (dispatch) => {
	dispatch({
		type: UPDATE_REQUEST,
		payload: {
			id, requestId,
			url, method, query, headers
		}
	})
}

export const deleteRequest = (id, requestId) => async (dispatch) => {
	dispatch({
		type: DELETE_REQUEST,
		payload: {
			id,
			requestId
		}
	})
}

export const renameRequest = (id, requestId, newName) => async (dispatch) => {
	dispatch({
		type: RENAME_REQUEST,
		payload: {
			id,
			requestId,
			newName
		}
	})
}