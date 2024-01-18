import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ParametersComponent } from './parameters/parameters.component';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from 'src/app/services/clients/clients.service';

const routes: Routes = [ 
  { path: "", component:ParametersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { 

}
