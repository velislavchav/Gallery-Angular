import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isValidLogin = true;
  isLogged = false;
  loginForm: FormGroup;
  constructor(fb: FormBuilder, private authService: AuthService) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  tryLogin() {
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.doLogin(data)
    .then(data =>
      // this.isValidLogin = true
      // this.isLogged = data.user.uid
      console.log(data)
    ).catch(err => {
      this.isValidLogin = false;
    });
  }

}
