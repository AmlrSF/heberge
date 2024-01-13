import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  { path : "", component : DashboardLayoutComponent ,children:[
    { path : 'home',loadChildren :()=>import("../pages/overview/overview.module").then(m=>m.OverviewModule) },
    { path : 'clients',loadChildren : ()=>import("../pages/clients/clients.module").then(m=>m.ClientsModule) },
    { path : "", redirectTo: "/admin/home", pathMatch:"full" }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
