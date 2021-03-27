import { LeadingComment } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaignComponent } from './pages/compaign/compaign.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeadsComponent } from './pages/leads/leads.component';

const routes: Routes = [
  {path:'', redirectTo:'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'leads',
    component: LeadsComponent
  },
  {
    path: 'compaigns',
    component: CompaignComponent
  },
  {path:'**',  redirectTo:'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
