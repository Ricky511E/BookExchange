import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const saltRounds = 10;
    const { email, password } = this.loginForm.value;
    this.http
      .post(
        'http://localhost:8080/userlogin/userlogin',
        { email, password },
        { withCredentials: true }
      )
      .subscribe({
        next: (res: any) => {
          console.log('Risposta dal backend:', res);
          if (res.success) {
            alert('Login riuscito!');
            this.loginForm.reset();
            this.router.navigate(['/user-profile']); // Naviga alla pagina del profilo utente
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.log('Errore dal backend:', err);
          if (err.status === 401) {
            alert('Credenziali errate.');
          } else {
            alert('Si è verificato un errore durante il login.');
          }
        },
      });
  }

  get f() {
    return this.loginForm.controls as { email: any; password: any };
  }
}
