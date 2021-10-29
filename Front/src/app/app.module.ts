import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './invited/landing-page/landing-page.component';
import { NavbarLandingpageComponent } from './invited/landing-page/navbar-landingpage/navbar-landingpage.component';
import { NormativityComponent } from './invited/landing-page/normativity/normativity.component';
import { QuestionsComponent } from './invited/landing-page/questions/questions.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './@core/services/auth/auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApiService, AuthStorageService, LocalStorageService, MemoryStorageService, RequestService } from './@core/services';
import { PagesComponent } from './pages/pages.component';



@NgModule({
  declarations: [
    AppComponent,
    // DashboardComponent,
    // PagesComponent,
    // LandingPageComponent,
    // NavbarLandingpageComponent,
    // NormativityComponent,
    // QuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    ApiService,
    RequestService,
    AuthStorageService,
    LocalStorageService,
    MemoryStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
