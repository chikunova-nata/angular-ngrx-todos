import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromAuth from '../reducers/auth.reducer';
import * as LoginActions from '../actions/auth.actions';
import { getLoggedIn } from '../reducers/auth.selectors';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromAuth.State>,
    public auth: AuthService,
    public router: Router
  ) {}
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new LoginActions.LoginRedirect());
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
