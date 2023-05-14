import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserLandingPageComponent } from './user-landing-page/user-landing-page.component';
import { LoginComponent } from './user-landing-page/login/login.component';
import { RegisterComponent } from './user-landing-page/register/register.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { ChatComponent } from './chat/chat.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ServiceComponent } from './user-landing-page/Service/service.component';
import { AboutComponent } from './user-landing-page/About/about.component';

const routes : Routes =[
  { path: 'eduxy', component: UserLandingPageComponent, children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'main', component: MainpageComponent},
    {path: 'service', component: ServiceComponent},
    {path: 'about', component: AboutComponent}
  ] },
  { path: 'home', component: HomeComponent, children: [
    {path: '', redirectTo: 'view', pathMatch: 'full'},
    {path: 'view', component: ViewComponent},
    {path: 'teacher-detail', component: UserDetailComponent},
    {path: 'student-detail', component: StudentDetailComponent},
    //{path: 'chat/:channelId/:emailId', component: ChatComponent},
    {path: 'chat', component: ChatComponent},

    
]},
  { path: '', redirectTo: '/eduxy', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
