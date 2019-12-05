export type Book = {
  _id: string;
  date: string;
}

export enum BookActions {
  BOOK_REQUEST = 'book/CREATE_REQUEST',
  BOOK_FAILED = 'book/CREATE_FAILED',
  BOOK_SUCCESS = 'book/CREATE_SUCCESS',
  LOAD_REQUEST = 'book/LOAD_REQUEST',
  LOAD_FAILED = 'book/LOAD_FAILED',
  LOAD_SUCCESS = 'book/LOAD_SUCCESS'
}

export interface BookLoadListPayload {
  userId: string;
  token: string
}

export interface BookRequestPayload {
  date: string;
  spotId: string;
  userId: string;
  token: string
}

export interface BookRequest {
  type: string;
  payload: BookRequestPayload;
}

export interface LoadRequest {
  type: string;
  payload: BookLoadListPayload;
}

export interface BookState {
  data: Book[];
  error: boolean;
}