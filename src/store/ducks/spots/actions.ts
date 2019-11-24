import { action } from 'typesafe-actions'
import { SpotActions, Spot } from './types'
import { RequestError } from '../../types'

export const spotsRequest = (technologies: string, token: string) => {
  return action(SpotActions.SPOTS_REQUEST, { technologies, token })
}

export const spotsFailed = (err: RequestError) => {
  return action(SpotActions.SPOTS_FAILED, { err })
}

export const spotsSuccess = (data: Spot[]) => {
  return action(SpotActions.SPOTS_SUCCESS, { data })
}