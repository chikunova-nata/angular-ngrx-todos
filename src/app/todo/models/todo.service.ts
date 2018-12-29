import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Todo} from './todo.model';
import {catchError, map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Todo>(this.url, todo, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${todo.id}`;
    return this.http.put<Todo>(url, todo, { headers: headers })
      .pipe(
        map(() => todo),
        catchError(this.handleError)
      );
  }
  deleteTodo(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/${id}`;
    return this.http.delete<Todo>(url, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
