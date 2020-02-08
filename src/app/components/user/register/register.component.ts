import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

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
  constructor(fb: FormBuilder, private authService: AuthService) {
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwords: fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
      }, { validators: [passwordsMatch] }),
    })
  }

  tryRegister() {
    const data = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwords.password
    }
    this.authService.doRegister(data);
  }
}
