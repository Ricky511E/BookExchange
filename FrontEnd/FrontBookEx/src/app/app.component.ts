import { Component } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from "./login/login.component";
import { HomepageComponent } from "./homepage/homepage.component";

@Component({
  selector: 'app-root',
  imports: [SignUpComponent, LoginComponent, HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BookExchange';
}
