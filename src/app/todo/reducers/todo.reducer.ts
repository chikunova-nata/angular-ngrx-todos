import { Action } from '@ngrx/store';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';
import {Todo} from '../models/todo.model';
import { featureAdapter, TodoState } from './todo.state';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

// export interface TodoState {
//   todos: Todo[];
//   error: string;
// }
//
// export const initialState: TodoState = {
//   todos: [],
//   error: ''
// };


export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: TodoState = featureAdapter.getInitialState(
  {
    todos: [],
    error: null
  }
);
export function reducer(state = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    case TodoActionTypes.LoadSuccess:
      return adapter.addAll(action.payload.todos, {
        ...state,
        error: null
      });
    case TodoActionTypes.LoadFail:
      return {
        ...state,
        todos: [],
        error: action.payload.error
      };
    case TodoActionTypes.CreateTodoSuccess:
      return adapter.addOne(action.payload.todo, {
        ...state,
        error: null
      });
    case TodoActionTypes.CreateTodoFail:
      return {
        ...state,
        error: action.payload.error
      };
    // case TodoActionTypes.UpdateTodoSuccess:
    //   return adapter.updateOne(action.payload, {
    //     ...state,
    //     error: null
    //   });
    case TodoActionTypes.UpdateTodoFail:
      return {
        ...state,
        error: action.payload
      };
    case TodoActionTypes.DeleteTodoSuccess:
      return adapter.removeOne(action.payload.id, {
        ...state,
        error: null
      });
    case TodoActionTypes.DeleteTodoFail:
      return {
        ...state,
        error: action.payload
      };
    // Default
    default:
      return state;
  }
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectAllTodos = selectAll;
