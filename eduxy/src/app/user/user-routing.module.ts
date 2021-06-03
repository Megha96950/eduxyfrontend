import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { LoginComponent } from './user-landing-page/login/login.component';
import { RegisterComponent } from './user-landing-page/register/register.component';
import { HomeComponent } from './home/home.component';

const routes : Routes =[
  { path: 'eduxy', component: UserLandingPageComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
  ] },
  { path: 'home', component: HomeComponent, children: [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
  
]},
  { path: '', redirectTo: '/eduxy', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
