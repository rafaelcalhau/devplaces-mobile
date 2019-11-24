import { Reducer } from 'redux'
import { SpotActions, SpotsState } from './types'

const INITIAL_STATE: SpotsState = {
  data: [],
  error: null,
  loaded: false
}

const reducer: Reducer = (state: SpotsState = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case SpotActions.SPOTS_FAILED: 
      return {
        ...state,
        error: action.err,
        loaded: false
      }
    case SpotActions.SPOTS_REQUEST: 
      return {
        ...state,
        error: null,
        loaded: false
      }
    case SpotActions.SPOTS_SUCCESS: 
      return {
        ...state,
        data: action.payload.data,
        error: null,
        loaded: true
      }
    default:
      return state
  }
}
export default reducer