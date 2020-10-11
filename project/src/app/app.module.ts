import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {BrowserAnimationsModule} from    '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOtpInputModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule
  ],
  exports: [MatExpansionPanel],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
