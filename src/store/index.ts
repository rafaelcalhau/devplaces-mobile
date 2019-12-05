import { combineReducers } from 'redux'

import bookReducer from './ducks/booking'
import spotsReducer from './ducks/spots'
import userReducer from './ducks/user'

const rootReducer = combineReducers({
  book: bookReducer,
  spots: spotsReducer,
  user: userReducer
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer