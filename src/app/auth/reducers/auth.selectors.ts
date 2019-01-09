import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

import * as fromRoot from '../../store/reducers';
import * as fromAuth from './auth.reducer';
import { getUser } from './auth.reducer';

export interface AppState extends fromRoot.State {
  auth: fromAuth.State;
}

export const reducers = {
  auth: fromAuth.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const getLoggedIn = createSelector(getUser, user => !!user);
