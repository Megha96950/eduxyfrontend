import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { RegisterComponent } from './user-landing-page/register/register.component';
import { LoginComponent } from './user-landing-page/login/login.component';
import { HomeComponent } from './home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './user-landing-page/login/login.service';
import { RegisterService } from './user-landing-page/register/register.service';



@NgModule({
  declarations: [
    UserLandingPageComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    UserRoutingModule
  ],
  providers: [
   
    LoginService,
    RegisterService
],
})
export class UserModule { }
