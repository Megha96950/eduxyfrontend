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
import { HomeService } from './home/home.service';
import { HomeSharedService } from './home/home-shared-service';
import { ViewComponent } from './view/view.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserSharedService } from './user-shared-service';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    UserLandingPageComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ViewComponent,
    UserDetailComponent,
    StudentDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    UserRoutingModule,
    NgSelectModule
  ],
  providers: [
   
    LoginService,
    RegisterService,
    HomeService,
    HomeSharedService,
    UserSharedService

],
})
export class UserModule { }
