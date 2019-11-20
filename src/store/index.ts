import { combineReducers } from 'redux'
import userReducer from './ducks/user'

const rootReducer = combineReducers({
  user: userReducer
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer