import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {TodoState} from '../../todo/reducers/todo.state';
import * as todoReducer from '../../todo/reducers/todo.reducer';

import { storeFreeze } from 'ngrx-store-freeze';

export interface State {
  todoState: TodoState;
}

export const reducers: ActionReducerMap<State> = {
  todoState: todoReducer.reducer
};


export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
