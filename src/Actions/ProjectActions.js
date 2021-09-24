import { ADD_PROJECT, ADD_REQUEST, REMOVE_PROJECT, RENAME_PROJECT } from '../ActionTypes/ProjectActions'

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