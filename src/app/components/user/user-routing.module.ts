import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginRegisterGuard } from 'src/app/guards/login-register.guard';


const userRoutes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [LoginRegisterGuard]
            },
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [LoginRegisterGuard]
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard]
            }]
    }
];

export const UserRoutingModule = RouterModule.forChild(userRoutes);