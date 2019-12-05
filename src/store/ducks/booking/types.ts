export type Book = {
  _id: string;
  date: string;
}

export enum BookActions {
  BOOK_REQUEST = 'book/REQUEST',
  BOOK_FAILED = 'book/FAILED',
  BOOK_SUCCESS = 'book/SUCCESS'
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

export interface BookState {
  data: Book[];
  error: boolean;
}