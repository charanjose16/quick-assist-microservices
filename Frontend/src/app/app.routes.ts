import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { WorkerSignupComponent } from './worker-signup/worker-signup.component';
import { UserRequestsComponent } from './user-requests/user-requests.component';
import { ServiceCategoriesComponent } from './service-categories/service-categories.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { WorkersListComponent } from './workers-list/workers-list.component';
import { WorkersDetailsComponent } from './workers-details/workers-details.component';
import { WorkerHomepageComponent } from './worker-homepage/worker-homepage.component';
import { WorkerRequestsComponent } from './worker-requests/worker-requests.component';
import { WorkerBookingsComponent } from './worker-bookings/worker-bookings.component';
import { WorkerProfileComponent } from './worker-profile/worker-profile.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WorkerReviewsComponent } from './worker-reviews/worker-reviews.component';

export const routes: Routes = [
    {path:"",component:LandingPageComponent},
{path:"create-account", component:CreateAccountComponent},
{path:"user-signup",component:UserSignupComponent},
{path:"login",component:LoginPageComponent},
{path:"worker-signup",component:WorkerSignupComponent},
{path:"user-homepage",component:UserHomepageComponent},
{path:"user-requests",component:UserRequestsComponent},
{path:"service-cat",component:ServiceCategoriesComponent},
{path:"user-bookings",component:UserBookingsComponent},
{path:"worker-list/:profession",component:WorkersListComponent},
{path:"worker-details",component:WorkersDetailsComponent},
{path:"worker-homepage",component:WorkerHomepageComponent},
{path:"worker-requests",component:WorkerRequestsComponent},
{path:"worker-bookings",component:WorkerBookingsComponent},
{path:"worker-profile",component:WorkerProfileComponent},
{path:"worker-reviews", component: WorkerReviewsComponent}
];


