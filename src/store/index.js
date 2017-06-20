import { routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import loggerMiddleware from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import { createFilter } from 'redux-persist-transform-filter'

import appReducer from './reducers'
import history from '../history'

const store = createStore(
  combineReducers({
    app: appReducer,
    router: routerReducer
  }),
  compose(
    autoRehydrate(),
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(loggerMiddleware)
  )
)

const filter = createFilter(
  'app', ['saved']
)

persistStore(store, { transforms: [filter] })

export default store
