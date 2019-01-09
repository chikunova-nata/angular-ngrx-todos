import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { User } from '../models/user';

export interface State {
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: 'Incorrect email and/or password.'
      };
    }

    default:
      return state;
  }
}

export const getUser = (state: State) => state.user;
