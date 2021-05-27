import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { RegisterComponent } from './user-landing-page/register/register.component';
import { LoginComponent } from './user-landing-page/login/login.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    UserLandingPageComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
