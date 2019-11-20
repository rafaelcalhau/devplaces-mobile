import { all, takeLatest } from 'redux-saga/effects'
import { UserActions } from './user/types'
import * as UserSagas from './user/sagas'

export default function * rootSaga() {
  return yield all([
    takeLatest(UserActions.LOGIN_REQUEST, UserSagas.login)
  ])
}