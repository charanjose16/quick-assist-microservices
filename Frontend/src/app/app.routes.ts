import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { WorkerSignupComponent } from './worker-signup/worker-signup.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { ServiceCategoriesComponent } from './service-categories/service-categories.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';

export const routes: Routes = [
{path:"user-signup",component:UserSignupComponent},
{path:"login",component:LoginPageComponent},
{path:"worker-signup",component:WorkerSignupComponent},
{path:"user-homepage",component:UserHomepageComponent},
{path:"user-requests",component:UserRequestsComponent},
{path:"service-cat",component:ServiceCategoriesComponent},
{path:"user-bookings",component:UserBookingsComponent}
];


