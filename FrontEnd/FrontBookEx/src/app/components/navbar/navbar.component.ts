import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  categories: any[] = []; // Array per memorizzare le categorie
  searchTitle: string = ''; // Titolo di ricerca
  tip: any[] = []; // Array per memorizzare i suggerimenti di libri
  debounceTimer: any; // Timer per il debounce

  constructor(
    private http: HttpClient,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadCategories(); // Carica le categorie al momento dell'inizializzazione
  }

  loadCategories() {
    // Metodo per caricare le categorie
    this.http.get<any[]>('URLapiGiorgio/categories').subscribe({
      next: (res) => (this.categories = res), // Salvo la risposta nell'array categories
      error: (err) => console.error('Errore caricamento categorie:', err),
    }); // Gestisco l'errore
  }

  onSearchInput() {
    // Metodo che viene eseguito ad ogni input nella barra di ricerca
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      // Pulisco il timer precedente per il debounce
      const title = this.searchTitle.trim(); // Ottiengo il valore della ricerca rimuovendo gli spazi
      if (title.length > 1) {
        this.http // Eseguo la chiamata API per ottenere i libri che corrispondono al titolo
          .get<any[]>(`URLapiGiorgio/book?title=${encodeURIComponent(title)}`)
          .subscribe({
            next: (res) => (this.tip = res), // Salvo i suggerimenti dei libri
            error: (err) => {
              console.error('Errore ricerca libri:', err);
              this.tip = []; // Resetto i suggerimenti in caso di errore
            },
          });
      } else {
        this.tip = []; // Se il titolo è troppo corto, resetto i suggerimenti
      }
    }, 300); // imposto il debounce di 300ms per non inviare troppe richieste
  }

  getBook(book: any) {
    // Metodo che viene chiamato quando si clicca su un libro dai suggerimenti
    this.searchTitle = book.title; // Imposto il titolo della ricerca al titolo del libro selezionato
    this.tip = []; // Resetto i suggerimenti

    // Vado alla pagina del libro , passando l'ID del libro come parametro
    this.router.navigate(['/book', book.id]);
  }
  // Vado alla pagina Home
  Home() {
    this.router.navigate(['/']); // Assicurati che la route per la home sia definita
  }
  // Vado alla pagina Libreria
  Library() {
    this.router.navigate(['/library']);
  }
  // Vado alla pagina Profilo
  Profile() {
    this.router.navigate(['/profile']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Metodo che ascolta ogni click su qualsiasi parte del documento e Ottiene il target del click
    const target = event.target as HTMLElement;

    // Se il click NON avviene dentro il componente della navbar
    if (!this.elementRef.nativeElement.contains(target)) {
      this.tip = []; // Nascondo la lista dei suggerimenti cioè se clicco
      // altrove si chiude la barra di ricerca
    }
  }
}
