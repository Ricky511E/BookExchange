import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  // Dichiaro books come any[] (oppure definisci interface Book {...})
  books: any[] = [
    {
      title: 'Il Signore degli Anelli',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      cover: 'https://via.placeholder.com/150x200?text=LOTR',
      conditions: 'Usato'
    },
    {
      title: '1984',
      author: 'George Orwell',
      genre: 'Distopia',
      cover: 'https://via.placeholder.com/150x200?text=1984',
      conditions: 'Nuovo'
    },
    {
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      genre: 'Fantasy',
      cover: 'https://via.placeholder.com/150x200?text=HP',
      conditions: 'Buone condizioni'
    }
  ];

  selectedBook: any = null;

  ngOnInit(): void {}

  openModal(book: any) {
    this.selectedBook = book;
  }

  closeModal() {
    this.selectedBook = null;
  }

  addToLibrary(book: any) {
    console.log('Aggiunto alla libreria:', book.title);
    this.closeModal();
  }
}