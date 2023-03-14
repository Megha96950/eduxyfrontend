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
import { ChatComponent } from './chat/chat.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebsocketService } from './chat/websocket.service';
import { ChatService } from './chat/chat.service';
import { ViewService } from './view/view.service';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChatpanelComponent } from './chatpanel/chatpanel.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from 'ngx-avatar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    UserLandingPageComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ViewComponent,
    UserDetailComponent,
    StudentDetailComponent,
    ChatComponent,
    ChatpanelComponent,
    ChatboxComponent
   // MatExpansionModule,
   // MatSidenavModule
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    UserRoutingModule,
    NgSelectModule,
    NgbModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule   ,
    AvatarModule,
    MatCardModule,
    MatListModule,
    PickerModule,
    MatBadgeModule,
    MatSnackBarModule,
    BrowserAnimationsModule
    

                    

  ],
  providers: [
   
    LoginService,
    RegisterService,
    HomeService,
    HomeSharedService,
    UserSharedService,
    WebsocketService,
    ChatService,
    ViewService

],
bootstrap: [HomeComponent]
})
export class UserModule { }
