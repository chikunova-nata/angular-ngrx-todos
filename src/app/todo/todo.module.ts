import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromTodo from './reducers/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './effects/todo.effects';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [TodoListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    TodoRoutingModule,
    StoreModule.forFeature('todoState', fromTodo.reducer),
    EffectsModule.forFeature([TodoEffects]),
    MaterialModule
  ]
})
export class TodoModule { }
