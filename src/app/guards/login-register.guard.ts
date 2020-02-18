import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoginRegisterGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router, private toastr: ToastrService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuth = localStorage.getItem('email');
    if(!isAuth) {
      return true;
    }
    this.router.navigate(['/home']);
    this.toastr.error('Can\'t access the page');
    return false;
  }
}
