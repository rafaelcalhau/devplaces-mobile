export interface ActionLogin {
  type: string;
  payload: UserLogin
}

export enum UserActions {
  LOGIN_REQUEST = '@user/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@user/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@user/LOGIN_FAILURE',
  LOGOUT = '@user/LOGOUT'
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