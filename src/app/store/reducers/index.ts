import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import {TodoState} from '../../todo/reducers/todo.reducer';
import * as todoReducer from '../../todo/reducers/todo.reducer';

export interface State {
  todoState: TodoState;
}

export const reducers: ActionReducerMap<State> = {
  todoState: todoReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
