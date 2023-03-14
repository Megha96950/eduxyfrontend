import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLandingPageComponent } from './user/user-landing-page/user-landing-page.component';
import { UserModule } from './user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeComponent } from './user/home/home.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatBadgeModule } from '@angular/material/badge';
import { ChatboxComponent } from './user/chatbox/chatbox.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AppComponent
   
  ],
  imports: [
   
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    UserModule,
    NgbModule,
    NgSelectModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    PickerModule,
    MatBadgeModule,
    MatSnackBarModule,

    
  ],
  providers: [BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
