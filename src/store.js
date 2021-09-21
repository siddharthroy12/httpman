import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { ProjectReducer } from './Reducers/ProjectReducer'

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  try {
    const serialisedState = JSON.stringify(state)
    localStorage.setItem("persistantState", serialisedState)
  } catch (e) {
    console.warn(e)
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState")
    if (serialisedState === null) return undefined
    return JSON.parse(serialisedState)
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

const reducer = combineReducers({
	project:ProjectReducer
})

const middleware = [thunk]

const store = createStore(reducer, loadFromLocalStorage(), composeWithDevTools(applyMiddleware(...middleware)))

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store