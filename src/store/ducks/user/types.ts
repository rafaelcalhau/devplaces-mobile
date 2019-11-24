export interface ActionLogin {
  type: string;
  payload: UserLogin
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export enum UserActions {
  LOGIN_REQUEST = '@user/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@user/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@user/LOGIN_FAILURE',
  LOGOUT = '@user/LOGOUT',
  SESSION_STORED = '@user/SESSION_STORED'
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface UserState {
  data: UserSession;
  error: string;
  loading: boolean;
}