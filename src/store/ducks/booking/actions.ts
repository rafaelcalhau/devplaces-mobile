import { action } from 'typesafe-actions'
import { BookActions, Book, BookRequestPayload } from './types'
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