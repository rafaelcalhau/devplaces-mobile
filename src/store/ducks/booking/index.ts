import { Reducer } from 'redux'
import { BookActions, BookState } from './types'

const INITIAL_STATE: BookState = {
  data: [],
  error: false
}

const reducer: Reducer = (state: BookState = INITIAL_STATE, action) => {
  const { type } = action

  switch(type) {
    case BookActions.BOOK_FAILED:
      return {
        ...state,
        error: true
      }
    case BookActions.BOOK_REQUEST:
      return {
        ...state,
        error: false
      }
    case BookActions.BOOK_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.data],
        error: false
      }
    case BookActions.LOAD_FAILED:
      return {
        ...state,
        error: true
      }
    case BookActions.LOAD_REQUEST:
      return {
        ...state,
        error: false
      }
    case BookActions.LOAD_SUCCESS:
      return {
        ...state,
        data: [...action.payload.data],
        error: false
      }
    default:
      return state
  }
}

export default reducer
