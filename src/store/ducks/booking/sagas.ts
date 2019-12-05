import { call, put } from 'redux-saga/effects'

import { bookFailed, bookSuccess } from './actions'
import { BookRequest } from './types'
import api from '../../../services/api'

export function * create (action: BookRequest) {
  const { payload } = action

  try {
    const response = yield call(api.post, `/spots/${payload.spotId}/bookings`, {
      date: payload.date
    }, {
      headers: {
        userid: payload.userId,
        authorization: `Bearer ${payload.token}`
      }
    })

    if (response.status === 200) {
      yield put(bookSuccess(response.data))
    } else {
      yield put(bookFailed(response.data))
    }
  } catch(e) {
    console.log(e)
    yield put(bookFailed({
      title: 'Exception',
      message: 'An exception occurred while trying to book a spot.'
    }))
  }
}