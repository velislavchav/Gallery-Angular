import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, PatternValidator } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

function passwordsMatch(c: AbstractControl) {
  return c.value.password === c.value.repeatPassword ? null : { passwordsMatch: true }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  usernameRegexPattern: RegExp = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
  emailRegexPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.registerForm = fb.group({
      name: ['', [Validators.required, Validators.pattern(this.usernameRegexPattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegexPattern)]],
      passwords: fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
      }, { validators: [passwordsMatch] }),
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
  }

  tryRegister() {
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.passwords.password;
    const phone = this.registerForm.value.phone;
    this.authService.signUp(email, password, phone, name);
  }

  get f() {
    return this.registerForm.controls;
  }
}
