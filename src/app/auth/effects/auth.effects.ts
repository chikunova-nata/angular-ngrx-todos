import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as LoginActions from '../actions/auth.actions';
import { tap } from 'rxjs/internal/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {}

  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType(LoginActions.AuthActionTypes.LOGIN),
    map((action: LoginActions.LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map((user) => {
          return new LoginActions.LogInSuccess({token: user.token, email: payload.email});
        }),
        catchError((error) => {
          return of(new LoginActions.LogInFailure({ error: error }));
        })
    );
    })
);


  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(LoginActions.AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/workplace');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(LoginActions.AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      LoginActions.AuthActionTypes.LOGIN_REDIRECT
    ),
    tap(authed => {
      this.router.navigate(['/workplace']);
    })
  );
}
