import { AsyncStorage } from 'react-native'
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
  console.log('Hi, my name is reducer', action)

  switch (type) {
    case UserActions.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        loading: false
      }
    case UserActions.LOGIN_REQUEST:
      console.log('reducer: loginRequest')
      return {
        ...state,
        error: '',
        loading: true
      }
    case UserActions.LOGIN_SUCCESS:
      return (async function (): Promise<UserState> {
        const data = { ...action.payload.data }
        await AsyncStorage.setItem('user', JSON.stringify(data))

        return {
          ...state,
          data,
          error: '',
          loading: false
        }
      }())
    case UserActions.LOGOUT:
      return (async function() {
        await AsyncStorage.removeItem('user')

        return {
          ...INITIAL_STATE
        }
      }())
    default:
      return state
  }
}

export default reducer