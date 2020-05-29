import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PasswordCredentialsDomainService } from '../../domain/user/service/password-credentials-domain.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name = '';
  rootForm: FormGroup;

  constructor(private passwordCredentialsDomainService: PasswordCredentialsDomainService) {
    this.rootForm = new FormGroup({
      login: new FormControl('bob@gmail.com'),
      password: new FormControl('admin123')
    })
  }

  login() {
    this.passwordCredentialsDomainService.login({
      email: this.rootForm.value.login,
      password: this.rootForm.value.password
    }).subscribe(response => {
      console.log(response);
    })
  }
}
