import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PasswordCredentialsDomainService } from '../../domain/user/service/password-credentials-domain.service';
import { Router } from '@angular/router';
import { FirebaseCloudMessagingService } from '../../services/firebase-cloud-messaging.service';
import { switchMap } from 'rxjs/internal/operators';
import * as Toast from 'nativescript-toast';

const applicationSettings = require('application-settings');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  rootForm: FormGroup;

  constructor(
      private passwordCredentialsDomainService: PasswordCredentialsDomainService,
      private router: Router,
      private firebaseCloudMessagingService: FirebaseCloudMessagingService,
  ) {
    this.rootForm = new FormGroup({
      login: new FormControl('bob@gmail.com'),
      password: new FormControl('admin123'),
    });

    if (applicationSettings.getString('jwt')) {
      this.router.navigateByUrl('/home');
    }
  }

  login() {
    this.firebaseCloudMessagingService.token$
        .pipe(
            switchMap(token => this.passwordCredentialsDomainService.loginMobile({
              email: this.rootForm.value.login,
              password: this.rootForm.value.password,
              pushToken: token,
            })),
        )
        .subscribe(response => {
          const headerValue = response.headers.get('authorization');
          if (!headerValue.startsWith('Bearer ')) {
            throw Error('Header value doesnt start with "Bearer "');
          }

          const jwt = headerValue.replace('Bearer ', '');
          applicationSettings.setString('jwt', jwt);
          this.router.navigateByUrl('/home');
        }, error => {
          console.error(error);
          Toast.makeText(error.message, '10000').show()
        });
  }
}
