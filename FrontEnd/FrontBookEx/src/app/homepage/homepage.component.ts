import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  originalBooks = [
    {
      title: 'LOTR',
      author: 'Tolkien',
      genre: 'Fantasy',
      cover: 'https://via.placeholder.com/150x200?text=LOTR',
      conditions: 'Usato',
      plot: 'meme'
    },
    {
      title: '1984',
      author: 'Orwell',
      genre: 'Distopia',
      cover: 'https://via.placeholder.com/150x200?text=1984',
      conditions: 'Nuovo',
      plot: 'meme'
    },
    {
      title: 'HP',
      author: 'Rowling',
      genre: 'Fantasy',
      cover: 'https://via.placeholder.com/150x200?text=HP',
      conditions: 'Buone',
      plot: 'meme'
    }
  ];
  books: any[] = [];
  selectedBook: any = null;

  ngOnInit(): void {
    // inizializza con 15 card
    for (let i = 0; i < 5; i++) {
      this.books.push(...this.originalBooks);
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    // controllo più robusto su tutta la pagina
    const scrollPos = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    if (scrollPos >= pageHeight - 100) {
      this.books.push(...this.originalBooks);
    }
  }

  openModal(book: any) { this.selectedBook = book; }
  closeModal() { this.selectedBook = null; }
  addToLibrary(book: any) {
    console.log('Aggiunto in libreria:', book.title);
    this.closeModal();
  }
}