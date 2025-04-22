import { Component } from '@angular/core';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'app-root',
  imports: [SignUpComponent, RouterOutlet, NavbarComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public router: Router) {}

  get mostraNavbar(): boolean {
    // const path = this.router.url;
    // return !(path === '/login' || path === '/sign-up');
    return true;
  }
}
