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
      plot: 'skibidi'
    },
    {
      title: '1984',
      author: 'Orwell',
      genre: 'Distopia',
      cover: 'https://via.placeholder.com/150x200?text=1984',
      conditions: 'Nuovo',
      plot: 'sigma boi'
    },
    {
      title: 'HP',
      author: 'Rowling',
      genre: 'Fantasy',
      cover: 'https://via.placeholder.com/150x200?text=HP',
      conditions: 'Buone',
      plot: 'toilet'
    }
  ];  
  books: any[] = [];
  selectedBook: any = null;

  ngOnInit(): void {
    this.loadBooks(30);
  }
  
  loadBooks(count: number = 15) {
    for (let i = 0; i < count / this.originalBooks.length; i++) {
      const cloned = this.originalBooks.map(book => ({
        ...book,
        plot: this.getRandomPlot()
      }));
      this.books.push(...cloned);
    }
  }
  
  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
  
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.loadBooks(9);
    }
  }
  
  getRandomPlot(): string {
    const memePlots = [
      'skibidi', 'toilet', 'sigma boi', 'gigachad',
      'rizzler', 'sus', 'meme king', 'npc moment', 'deez nuts'
    ];
    return memePlots[Math.floor(Math.random() * memePlots.length)];
  }  
     

  openModal(book: any) { this.selectedBook = book; }
  closeModal() { this.selectedBook = null; }
  addToLibrary(book: any) {
    console.log('Aggiunto in libreria:', book.title);
    this.closeModal();
  }
}