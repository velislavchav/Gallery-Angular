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
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.signIn(email, password);
  }

}
