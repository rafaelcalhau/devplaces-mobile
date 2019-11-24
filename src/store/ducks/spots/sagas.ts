import { call, put } from 'redux-saga/effects'

import { SpotsRequest } from './types'
import { spotsFailed, spotsSuccess } from './actions'
import api from '../../../services/api'

export function * load (action: SpotsRequest) {
  const { payload } = action

  try {
    const query = payload.technologies.length ? `?technologies${payload.technologies}` : ''
    const response = yield call(api.get, `/spots${query}`, {
      headers: {
        authorization: `Bearer ${payload.token}`
      }
    })

    console.log(response)

    if (response.status === 200) {
      yield put(spotsSuccess(response.data))
    } else {
      yield put(spotsFailed(response.data))
    }
  } catch {
    yield put(spotsFailed({
      title: 'Exception',
      message: 'An exception occurred while trying to request the spots.'
    }))
  }
}