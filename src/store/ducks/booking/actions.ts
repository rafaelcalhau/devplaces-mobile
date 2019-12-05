import { action } from 'typesafe-actions'
import { BookActions, Book, BookRequestPayload, BookLoadListPayload } from './types'
import { RequestError } from '../../types'

export const bookRequest = (request: BookRequestPayload) => {
  return action(BookActions.BOOK_REQUEST, { ...request })
}

export const bookFailed = (err: RequestError) => {
  return action(BookActions.BOOK_FAILED, { err })
}

export const bookSuccess = (payload: Book) => {
  return action(BookActions.BOOK_SUCCESS, { payload })
}

export const bookListRequest = (request: BookLoadListPayload) => {
  return action(BookActions.LOAD_REQUEST, { ...request })
}

export const bookListFailed = (err: RequestError) => {
  return action(BookActions.LOAD_FAILED, { err })
}

export const bookListSuccess = (payload: Book[]) => {
  return action(BookActions.LOAD_SUCCESS, { data: payload })
}