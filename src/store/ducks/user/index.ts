import { Reducer } from 'redux'
import { UserActions, UserState } from './types'

const INITIAL_STATE: UserState = {
  data: {
    id: '',
    name: '',
    email: '',
    token: ''
  },
  error: '',
  loading: false
}

const reducer: Reducer = (state: UserState = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case UserActions.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false
      }
    case UserActions.LOGIN_REQUEST:
      return {
        ...state,
        error: '',
        loading: true
      }
    case UserActions.LOGIN_SUCCESS:
      return (function (): UserState {
        const data = { ...action.payload.data }
        
        return {
          ...state,
          data,
          error: '',
          loading: false
        }
      }())
    case UserActions.LOGOUT:
      return {
        ...INITIAL_STATE
      }
    case UserActions.SESSION_STORED:
      return {
        ...state,
        data: action.payload.data,
        error: '',
        loading: false
      }
    default:
      return state
  }
}

export default reducer