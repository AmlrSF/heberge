import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

const routes: Routes = [

 
  {
    path: "admin", canActivate:[authGuard],
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  { path: "", redirectTo: "/Login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
