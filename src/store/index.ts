import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'
import { ActionTypes } from 'actions'

const composeEnhancers =
  globalThis.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppDispatch = typeof store.dispatch<ActionTypes>

export default store
