import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name = '';
  private rootForm: FormGroup;

  constructor() {
    this.rootForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  login() {
    console.log(this.rootForm.value);
  }
}
