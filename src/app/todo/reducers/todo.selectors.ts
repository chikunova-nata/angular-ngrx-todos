import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

// Selector functions
const getTodoFeatureState = createFeatureSelector<TodoState>('todoState');

export const getTodos = createSelector(
  getTodoFeatureState,
  state => state.todos
);

export const getError = createSelector(
  getTodoFeatureState,
  state => state.error
);



// export const selectMyFeatureState: MemoizedSelector<
//   object,
//   TodoState
//   > = createFeatureSelector<TodoState>('todoState');
//
//
// export const selectAllMyFeatureItems: (
//   state: object
// ) => MyModel[] = featureAdapter.getSelectors(selectMyFeatureState).selectAll;
//
// export const getError = (state: TodoState): any => state.error;
// export const selectMyFeatureError: MemoizedSelector<object, any> = createSelector(
//   selectMyFeatureState,
//   getError
// );
