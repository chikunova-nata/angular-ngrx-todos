import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../../store/reducers';
import { Observable } from 'rxjs';
import {Todo} from '../models/todo.model';
import * as todoActions from '../actions/todo.actions';
import * as todoSelectors from '../reducers/todo.selectors';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  newTodo = <Todo>{};
  todos$: Observable<Todo[]>;
  errorMessage$: Observable<string>;
  todoListForm: FormGroup;

  constructor(private store$: Store<fromStore.State>,
              private fb: FormBuilder) { }


  get title() { return this.todoListForm.get('title'); }
  ngOnInit() {
    this.store$.dispatch(new todoActions.Load());
    this.todos$ = this.store$.select(todoSelectors.selectAllTodos);
    this.errorMessage$ = this.store$.pipe(select(todoSelectors.getError));

    this.todoListForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  addTodo(): void {
    this.store$.dispatch(new todoActions.CreateTodo(this.todoListForm.value));
    this.todoListForm.reset();
  }

  updateTodo(todo): void {
    this.store$.dispatch(new todoActions.UpdateTodo(todo));
  }

  deleteTodo(todo: Todo): void {
    this.store$.dispatch(new todoActions.DeleteTodo({ id: todo.id}));
  }

}
