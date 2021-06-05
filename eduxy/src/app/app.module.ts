import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLandingPageComponent } from './user/user-landing-page/user-landing-page.component';
import { UserModule } from './user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
   
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    UserModule,
    NgbModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
