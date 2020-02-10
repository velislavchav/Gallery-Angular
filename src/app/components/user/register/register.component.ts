import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

function passwordsMatch(c: AbstractControl) {
  // if(c.value.password != c.value.repeatPassword) {
  //   this.toastr.warning("Passwords should be the same!", "Warning");
  // }
  return c.value.password === c.value.repeatPassword ? null : { passwordsMatch: true }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.registerForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
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

  // passwordsMatch(c: AbstractControl) {
  //   if(c.value.password === c.value.repeatPassword) {
  //     this.toastr.warning("Passwords should be the same!", "Warning");
  //   }
  // }
}
