import { all, takeLatest } from 'redux-saga/effects'

import { SpotActions } from './spots/types'
import { UserActions } from './user/types'

import * as SpotsSagas from './spots/sagas'
import * as UserSagas from './user/sagas'

export default function * rootSaga() {
  return yield all([
    takeLatest(SpotActions.SPOTS_REQUEST, SpotsSagas.load),
    takeLatest(UserActions.LOGIN_REQUEST, UserSagas.login)
  ])
}