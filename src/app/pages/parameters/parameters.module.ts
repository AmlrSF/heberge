import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { ParametersComponent } from './parameters/parameters.component';


@NgModule({
  declarations: [
    ParametersComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
