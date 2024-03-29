import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ModalModule} from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';
import {RouterModule} from '@angular/router';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { JwtInterceptor } from './_helpers/jwt.Interceptor';
import { AuthGuardService } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    DataTablesModule,
    RouterModule
  ],
  providers: [
    AuthGuardService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
