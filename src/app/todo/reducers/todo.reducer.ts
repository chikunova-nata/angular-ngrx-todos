import { Action } from '@ngrx/store';
import { TodoActions, TodoActionTypes } from '../actions/todo.actions';
import {Todo} from '../models/todo.model';

export interface TodoState {
  showTodoId: boolean;
  todos: Todo[];
  error: string;
}

export const initialState: TodoState = {
  showTodoId: false,
  todos: [],
  error: ''
};

export function reducer(state = initialState, action: TodoActions): TodoState {
  switch (action.type) {
    // Load
    case TodoActionTypes.LoadSuccess:
      return {
        ...state,
        todos: action.payload,
        error: ''
      };
    case TodoActionTypes.LoadFail:
      return {
        ...state,
        todos: [],
        error: action.payload
      };
    // Create
    case TodoActionTypes.CreateTodoSuccess:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        error: ''
      };
    case TodoActionTypes.CreateTodoFail:
      return {
        ...state,
        error: action.payload
      };
    // Update
    case TodoActionTypes.UpdateTodoSuccess:
      const updatedTodos = state.todos.map(item => action.payload.id === item.id ? action.payload : item);
      return {
        ...state,
        todos: updatedTodos,
        error: ''
      };
    case TodoActionTypes.UpdateTodoFail:
      return {
        ...state,
        error: action.payload
      };
    // Delete
    case TodoActionTypes.DeleteTodoSuccess:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        error: ''
      };
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
