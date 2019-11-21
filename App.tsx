import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import Routes from './src/routes'
import reducer from './src/store'
import sagas from './src/store/ducks/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware))

sagaMiddleware.run(sagas)

export default () =>
  <Provider store={store}>
    <Routes />
  </Provider>
