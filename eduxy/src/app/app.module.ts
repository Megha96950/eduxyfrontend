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
    NgSelectModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
