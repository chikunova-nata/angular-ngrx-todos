import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from '../models/todo.model';


export interface TodoState extends EntityState<Todo> {
  todos: Todo[];
  error?: any;
}

export const featureAdapter: EntityAdapter<
  Todo
  > = createEntityAdapter<Todo>({
  selectId: model => model.id
});


