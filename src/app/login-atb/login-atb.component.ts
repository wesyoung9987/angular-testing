import { Component } from '@angular/core';

import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login-atb',
  templateUrl: './login-atb.component.html',
  styleUrls: ['./login-atb.component.css']
})
export class LoginAtbComponent {

  constructor(private auth: AuthService) { }

  needsLogin() {
    return !this.auth.isAuthenticated();
  }

}
