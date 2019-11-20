import { action } from 'typesafe-actions'
import { UserActions, UserSession } from './types'
import { RequestError } from '../../types'

export const loginRequest = (email: string, password: string) => {
  console.log('loginRequest...')
  return action(UserActions.LOGIN_REQUEST, { email, password })
}

export const loginSuccess = (data: UserSession) => {
  console.log('loginSuccess...')
  return action(UserActions.LOGIN_SUCCESS, { data })
}

export const loginFailed = (err: RequestError) => {
  console.log('loginFailed...')
  return action(UserActions.LOGIN_FAILURE, { err })
}

export const logout = () => {
  console.log('logout...')
  return action(UserActions.LOGOUT)
}
