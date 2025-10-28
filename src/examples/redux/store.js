import { createStore, applyMiddleware, combineReducers } from 'redux'

// Action Types
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const RESET = 'RESET'
const SET_LOADING = 'SET_LOADING'
const SET_USERS = 'SET_USERS'

// Action Creators
export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })
export const reset = () => ({ type: RESET })
export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading })
export const setUsers = (users) => ({ type: SET_USERS, payload: users })

// Thunk middleware (простая реализация)
const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }
  return next(action)
}

// Async Actions
export const incrementAsync = () => async (dispatch) => {
  dispatch(setLoading(true))
  await new Promise(resolve => setTimeout(resolve, 1000))
  dispatch(increment())
  dispatch(setLoading(false))
}

export const fetchUsers = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    dispatch(setUsers(data.slice(0, 3)))
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    dispatch(setLoading(false))
  }
}

// Counter Reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 }
    case DECREMENT:
      return { ...state, count: state.count - 1 }
    case RESET:
      return { ...state, count: 0 }
    default:
      return state
  }
}

// Users Reducer
const usersReducer = (state = { users: [], loading: false }, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload }
    case SET_USERS:
      return { ...state, users: action.payload }
    default:
      return state
  }
}

// Root Reducer
const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
})

// Create Store
export const store = createStore(rootReducer, applyMiddleware(thunk))

