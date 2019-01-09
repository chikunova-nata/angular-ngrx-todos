import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../reducers/auth.selectors';
import * as LoginActions from '../actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.store.dispatch(new LoginActions.LogIn(this.loginForm.value));
  }

}
