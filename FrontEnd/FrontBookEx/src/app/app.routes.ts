import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
// import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: SignUpComponent }, // 👈 questa è la home iniziale
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  // { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
