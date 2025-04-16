import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] 
})
export class SignUpComponent {
  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('Form non valido');
      return;
    }

    const { nome, cognome, email, password, confirmPassword } = form.value;

    if (password !== confirmPassword) {
      alert('Le password non coincidono!');
      return;
    }

    const userData = {
      nome,
      cognome,
      email,
      password,
    };

    console.log('Dati da inviare al backend:', userData);

    this.http.post('https://TUO_BACKEND/api/signup', userData).subscribe({
      next: (res) => {
        console.log('Registrazione avvenuta con successo!', res);
        alert('Registrazione completata!');
        form.reset();
      },
      error: (err) => {
        console.error('Errore nella registrazione', err);
        alert('Errore durante la registrazione.');
      },
    });
  }
}
