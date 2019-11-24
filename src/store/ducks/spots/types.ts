import { User } from '../user/types'
import { RequestError } from '../../types'

export enum SpotActions {
  SPOTS_REQUEST = 'spots/REQUEST',
  SPOTS_FAILED = 'spots/FAILED',
  SPOTS_SUCCESS = 'spots/SUCCESS'
}

export interface Spot {
  technologies: string[];
  _id: string;
  company: string;
  price: number;
  thumbnail: string;
  user: User
}

export interface SpotsRequest {
  type: string;
  payload: {
    technologies: string;
    token: string
  }
}

export interface SpotsState {
  data: Spot[],
  error: null | RequestError;
  loaded: boolean
}