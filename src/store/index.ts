import { combineReducers } from 'redux'
import spotsReducer from './ducks/spots'
import userReducer from './ducks/user'

const rootReducer = combineReducers({
  spots: spotsReducer,
  user: userReducer
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer