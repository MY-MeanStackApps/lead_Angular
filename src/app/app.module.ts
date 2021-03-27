import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from "ngx-toastr";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeadService } from './services/lead.service';
import { CompaignService } from './services/compaign.service';
import { NavbarComponent } from './pages/common/navbar/navbar.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import { CompaignComponent } from './pages/compaign/compaign.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LeadsComponent,
    CompaignComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule
  ],
  providers: [LeadService,CompaignService],
  bootstrap: [AppComponent]
})
export class AppModule { }
