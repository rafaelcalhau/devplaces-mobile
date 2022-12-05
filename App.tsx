import React from 'react'
// import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import Router from './src/Router'
import reducer from './src/store'
import sagas from './src/store/ducks/rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger, sagaMiddleware])
})

sagaMiddleware.run(sagas)

export default () =>
  <Provider store={store}>
    <Router />
  </Provider>
