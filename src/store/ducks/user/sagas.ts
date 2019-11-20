import { call, put } from 'redux-saga/effects'
import { ActionLogin } from './types'
import api from '../../../services/api'
import { loginFailed, loginSuccess } from './actions'

export function * login(action: ActionLogin) {
  console.log('login')

  const data = action.payload

  try {
    const response = yield call(api.post, '/authenticate', {
      email: data.email,
      password: data.password
    })
  
    if (response.status === 200) {
      yield put(loginSuccess(response.data))
    } else {
      yield put(loginFailed(response.data))
    }
  } catch {
    yield put(loginFailed({
      title: 'Exception',
      message: 'An exception occurred while trying to login the user.'
    }))
  }
}