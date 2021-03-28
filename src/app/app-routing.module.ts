import { LeadingComment } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaignComponent } from './pages/compaign/compaign.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { CompMemberComponent } from './pages/comp-member/comp-member.component';

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
  {
    path: 'compaign/:id',
    component: CompMemberComponent
  },
  {path:'**',  redirectTo:'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
