import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import Routes from './src/routes'
import reducer from './src/store'
import sagas from './src/store/ducks/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

export default () =>
  <Provider store={store}>
    <Routes />
  </Provider>
