import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';

interface Book {
  title: string;
  author: string;
  owner: string;
  cover: string;
}

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  interestedBooks: Book[] = [];
  ownBooks: Book[] = [];
  selectedInterested: Book | null = null;
  selectedOwn: Book | null = null;
  showConfirmModal = false;

  private placeholderInterested: Book[] = [
    { title: 'Dune', author: 'Herbert', owner: 'Mario Rossi', cover: 'https://via.placeholder.com/150x200?text=Dune' },
    { title: 'Fahrenheit 451', author: 'Bradbury', owner: 'Giulia Bianchi', cover: 'https://via.placeholder.com/150x200?text=451' },
    { title: 'Il vecchio e il mare', author: 'Hemingway', owner: 'Luca Verdi', cover: 'https://via.placeholder.com/150x200?text=Vecchio' }
    // … altri
  ];
  private placeholderOwn: Book[] = [
    { title: 'Il piccolo principe', author: 'Saint-Exupéry', owner: 'Tu', cover: 'https://via.placeholder.com/150x200?text=Principe' },
    { title: 'La coscienza di Zeno', author: 'Svevo', owner: 'Tu', cover: 'https://via.placeholder.com/150x200?text=Zeno' },
    { title: 'Orgoglio e Pregiudizio', author: 'Austen', owner: 'Tu', cover: 'https://via.placeholder.com/150x200?text=Orgoglio' }
    // … altri
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Book[]>('http://localhost:8080/library/interested')
      .pipe(catchError(() => of(this.placeholderInterested)))
      .subscribe(data => this.interestedBooks = data);

    this.http.get<Book[]>('http://localhost:8080/library/own')
      .pipe(catchError(() => of(this.placeholderOwn)))
      .subscribe(data => this.ownBooks = data);
  }

  selectInterested(book: Book) {
    this.selectedInterested = book;
  }

  selectOwn(book: Book) {
    this.selectedOwn = book;
  }

  openConfirm() {
    this.showConfirmModal = true;
  }

  confirmSwap() {
    if (this.selectedInterested && this.selectedOwn) {
      const i = this.interestedBooks.indexOf(this.selectedInterested);
      const o = this.ownBooks.indexOf(this.selectedOwn);
      this.interestedBooks.splice(i, 1);
      this.ownBooks.splice(o, 1);
      this.interestedBooks.push(this.selectedOwn);
      this.ownBooks.push(this.selectedInterested);
      this.selectedInterested = null;
      this.selectedOwn = null;
      this.showConfirmModal = false;
    }
  }

  cancelSwap() {
    this.showConfirmModal = false;
  }
}