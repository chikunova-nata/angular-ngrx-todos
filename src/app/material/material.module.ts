import {NgModule} from '@angular/core';

import {
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MAT_RIPPLE_GLOBAL_OPTIONS
} from '@angular/material';

const modules: any[] =   [
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}}
  ]
})
export class MaterialModule {}
