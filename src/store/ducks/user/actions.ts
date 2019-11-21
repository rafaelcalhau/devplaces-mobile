import { action } from 'typesafe-actions'
import { UserActions, UserSession } from './types'
import { RequestError } from '../../types'

export const loginRequest = (email: string, password: string) => {
  return action(UserActions.LOGIN_REQUEST, { email, password })
}

export const loginSuccess = (data: UserSession) => {
  return action(UserActions.LOGIN_SUCCESS, { data })
}

export const loginFailed = (err: RequestError) => {
  return action(UserActions.LOGIN_FAILURE, { err })
}

export const logout = () => {
  return action(UserActions.LOGOUT)
}

export const sessionStored = (data: UserSession) => {
  return action(UserActions.SESSION_STORED, { data })
}