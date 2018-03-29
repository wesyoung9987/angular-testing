import { Component } from '@angular/core';

import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login-change-detection',
  templateUrl: './login-change-detection.component.html',
  styleUrls: ['./login-change-detection.component.css']
})
export class LoginChangeDetectionComponent {

  constructor(private auth: AuthService) { }

  needsLogin() {
    return !this.auth.isAuthenticated();
  }

}
