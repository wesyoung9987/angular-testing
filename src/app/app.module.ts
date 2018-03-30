import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";

// Services
import {AuthService} from "./auth.service";
import {AuthAsyncService} from "./auth-async.service";
import {GithubApiService} from "./github/github-api.service";

// Components
import { AppComponent } from './app.component';
import { DefaultPipe } from './default.pipe';
import { LoginComponent } from './login/login.component';
import { LoginAtbComponent } from './login-atb/login-atb.component';
import { LoginChangeDetectionComponent } from './login-change-detection/login-change-detection.component';
import { GithubComponent } from './github/github.component';


@NgModule({
  declarations: [
    AppComponent,
    DefaultPipe,
    LoginComponent,
    LoginAtbComponent,
    LoginChangeDetectionComponent,
    GithubComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthAsyncService,
    GithubApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
