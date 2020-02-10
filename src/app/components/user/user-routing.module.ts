import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';

const userRoutes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: 'register',
                component: RegisterComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard]
            }]
    }
];

export const UserRoutingModule = RouterModule.forChild(userRoutes);