import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AuthService} from "./auth.service";
import { DefaultPipe } from './default.pipe';
import { LoginComponent } from './login/login.component';
import { LoginAtbComponent } from './login-atb/login-atb.component';
import { LoginChangeDetectionComponent } from './login-change-detection/login-change-detection.component';


@NgModule({
  declarations: [
    AppComponent,
    DefaultPipe,
    LoginComponent,
    LoginAtbComponent,
    LoginChangeDetectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
