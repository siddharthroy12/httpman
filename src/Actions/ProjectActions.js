import { ADD_PROJECT, REMOVE_PROJECT, RENAME_PROJECT } from '../ActionTypes/ProjectActions'

export const addProject = (name) => async (dispatch) => {
	dispatch({
		type: ADD_PROJECT,
		payload: {
			name
		}
	})
}

export const removeProject = (name) => async (dispatch) => {
	dispatch({
		type: REMOVE_PROJECT,
		payload: name
	})
}

export const renameProject = (id, newName) => async (dispatch) => {
	dispatch({
		type: RENAME_PROJECT,
		payload: {
			id,
			newName
		}
	})
}