import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

const applicationSettings = require("application-settings");

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  jwtContent: JwtContent;

  constructor(private router: Router) {
    const jwt = applicationSettings.getString('jwt');
    if (!jwt) {
      this.logout();
    }

    this.jwtContent = this.extractJwtContent(jwt);

  }

  logout() {
    applicationSettings.remove('jwt');
    this.router.navigateByUrl('/login');
  }

  private extractJwtContent(jwt: string): JwtContent {
    const b64Payload = jwt.split('.')[1];
    return JSON.parse(atob(b64Payload));
  }
}

export interface JwtContent {
  email: string;
  sub: string;
  jti: string;
  exp: number;
  iat: number;
}

