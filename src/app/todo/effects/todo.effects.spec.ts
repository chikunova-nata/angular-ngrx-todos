import { TestBed, inject } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { TodoService } from '../models/todo.service';
import { TodoEffects } from './todo.effects';
import * as todoActions from '../actions/todo.actions';
import { Todo } from '../models/todo.model';
import { HttpClientModule } from '@angular/common/http';

export const generateTodo = (): Todo => {
  return {
    id: 111,
    title: 'First todo',
    complete: false
  };
};

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;
  let todoService: any;
  //
  // const todo1 = { id: '111', title: 'First todo', complete: false } as Todo;
  // const todo2 = { id: '222', title: 'Second todo', complete: false } as Todo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        {
          provide: todoService,
          useValue: {
            getTodos: jest.fn(),
            createTodo: jest.fn(),
            updateTodo: jest.fn(),
            deleteTodo: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.get(TodoEffects);
    todoService = TestBed.get(TodoService);
    actions$ = TestBed.get(Actions);
  });

  describe('loadTodos$', () => {
    it('should return todoActions.LoadSuccess with todos on success', () => {
      const action = new todoActions.Load();
      const todo = generateTodo();
      const outcome = new todoActions.LoadSuccess({ todos: [todo] });


      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: [todo] });
      const expected = cold('--b', { b: outcome });
      todoService.getTodos = jest.fn(() => response);

      expect(effects.loadTodos$).toBeObservable(expected);
    });
    it('should return a todoActions.LoadFail, if the query throws error', () => {
      const action = new todoActions.Load();
      const error = 'Error!';
      const completion = new todoActions.LoadFail(error);

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      todoService.getTodos = jest.fn(() => response);

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });

  // describe('createTodo$', () => {
  //   it('should return a todoActions.CreateTodoSuccess, with todo on success', () => {
  //     const action = new todoActions.CreateTodo(todo1);
  //     const completion = new todoActions.CreateTodoSuccess({todo: todo1});
  //
  //     actions$ = hot('-a', { a: action });
  //     const response = cold('-b', { b: true });
  //     const expected = cold('--c', { c: completion });
  //     todoService.createTodo = jest.fn(() => response);
  //
  //     expect(effects.createTodo$).toBeObservable(expected);
  //   });
  // });


});
