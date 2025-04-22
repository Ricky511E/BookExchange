import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup;

  // Definizione dei campi del form con validatori di base
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signUpForm = this.fb.group(
      {
        name: ['', Validators.required], // Campo obbligatorio
        surname: ['', Validators.required], // Campo obbligatorio
        email: ['', [Validators.required, Validators.email]], // Campo 'email' obbligatorio e deve essere un'email valida
        password: ['', [Validators.required, Validators.minLength(8)]], // Campo 'password' obbligatorio e con almeno 8 caratteri
        confirmPassword: ['', Validators.required], // Campo 'confirmPassword' obbligatorio per confermare la password
      },
      // qua aggiungo un validatore  per verificare se le password coincidono
      { validators: [this.passwordsMatchValidator as ValidatorFn] }
    );
  }
  // Funzione per validare che la password e la conferma della password siano uguali
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value; // Ottengo il valore della password
    const confirmPassword = form.get('confirmPassword')?.value; // Ottengo il valore della conferma della password
    return password === confirmPassword ? null : { passwordsMismatch: true }; // Se non coincidono, restituisco un errore
  }

  // Questa funzione viene chiamata quando il form viene inviato
  onSubmit() {
    if (this.signUpForm.invalid) {
      // Se il form non è valido, non invia i dati e stampo un messaggio di avviso
      console.warn('Form non valido');
      return;
    }

    // Estraggo i dati dal form
    const { name, surname, email, password } = this.signUpForm.value;
    // Creo un oggetto con i dati dell'utente, usando la password cifrata
    const userData = { name, surname, email, password};

    // Log per vedere i dati prima di inviarli quindi questo dovremmo toglierlo appena ho l'url di Giorgio
    console.log('Dati da inviare al backend (JSON):', JSON.stringify(userData));

    // Eseguo la richiesta POST al backend per registrare l'utente
    this.http.post('http://localhost:8080/users', userData).subscribe({
      next: (res) => {
        // Se la registrazione va a buon fine, mostro un messaggio
        console.log('Registrazione avvenuta con successo!', res);
        alert('Registrazione completata!');
        // Resetto il form
        this.signUpForm.reset();
      },
      error: (err) => {
        // Se c'è un errore, mostro un messaggio di errore
        console.error('Errore nella registrazione', err);
        alert('Errore durante la registrazione.');
      },
    });
  }
  // Getter per i controlli del form (utile per la gestione dei messaggi di errore nel template)
  get f() {
    return this.signUpForm.controls as {
      name: any;
      surname: any;
      email: any;
      password: any;
      confirmPassword: any;
    };
  }
}
