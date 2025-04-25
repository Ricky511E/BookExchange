import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Whisper&display=swap');
      .whisper-regular {
        font-family: 'Whisper', cursive;
      }
    `,
    `
      @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap');
      .merriweather-regular {
        font-family: 'Merriweather', serif;
      }
    `,
  ],
})
export class UserProfileComponent implements OnInit {
  @ViewChild('titleRef') titleElement!: ElementRef;

  fullText = 'My Library';
  displayedText = '';
  typingSpeed = 100; // millisecondi tra lettere
  isTyping = false;

  userProfile = {
    image: 'https://via.placeholder.com/100', // fallback temporaneo
    name: '',
    surname: '',
    email: '',
  };

  books: any[] = [];

  selectedBook: any = null;
  showAddBookModal = false;

  newBook = {
    cover: '',
    title: '',
    genre: '',
    condition: '',
    plot: '',
  };

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.typeText();
    }, 1000);

    // this.userProfileService.getUserProfile().subscribe((profile) => {
    //   this.userProfile = profile;
    // });

    // this.userProfileService.getBooks().subscribe((books) => {
    //   this.books = books;
    // });
    this.userProfile = {
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      name: 'Mario',
      surname: 'Rossi',
      email: 'mario.rossi@example.com',
    };

    this.books = [
      {
        cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
        title: 'Il piccolo principe',
        genre: 'Narrativa',
        condition: 'Ottime',
        plot: 'Un viaggio filosofico nel mondo dei bambini e degli adulti.',
      },
      {
        cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        title: '1984',
        genre: 'Distopico',
        condition: 'Buone',
        plot: 'Un futuro totalitario dove tutto è sotto controllo.',
      },
      {
        cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
        title: 'Il piccolo principe',
        genre: 'Narrativa',
        condition: 'Ottime',
        plot: 'Un viaggio filosofico nel mondo dei bambini e degli adulti.',
      },
      {
        cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        title: '1984',
        genre: 'Distopico',
        condition: 'Buone',
        plot: 'Un futuro totalitario dove tutto è sotto controllo.',
      },
      {
        cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
        title: 'Il piccolo principe',
        genre: 'Narrativa',
        condition: 'Ottime',
        plot: 'Un viaggio filosofico nel mondo dei bambini e degli adulti.',
      },
      {
        cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        title: '1984',
        genre: 'Distopico',
        condition: 'Buone',
        plot: 'Un futuro totalitario dove tutto è sotto controllo.',
      },
      {
        cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
        title: 'Il piccolo principe',
        genre: 'Narrativa',
        condition: 'Ottime',
        plot: 'Un viaggio filosofico nel mondo dei bambini e degli adulti.',
      },
      {
        cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        title: '1984',
        genre: 'Distopico',
        condition: 'Buone',
        plot: 'Un futuro totalitario dove tutto è sotto controllo.',
      },
      {
        cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
        title: 'Il piccolo principe',
        genre: 'Narrativa',
        condition: 'Ottime',
        plot: 'Un viaggio filosofico nel mondo dei bambini e degli adulti.',
      },
      {
        cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        title: '1984',
        genre: 'Distopico',
        condition: 'Buone',
        plot: 'Un futuro totalitario dove tutto è sotto controllo.Un futuro totalitario dove tutto è sotto controlloUn futuro totalitario dove tutto è sotto controllo',
      },
    ];
  }

  typeText() {
    this.isTyping = true; // mostra <h3> ora
    let currentIndex = 0;
    const interval = setInterval(() => {
      this.displayedText += this.fullText[currentIndex];
      currentIndex++;
      if (currentIndex === this.fullText.length) {
        clearInterval(interval);

        // Rimuovi il cursore
        setTimeout(() => {
          this.titleElement.nativeElement.classList.remove('typing-cursor');
        }, 300);
      }
    }, this.typingSpeed);
  }

  addBook(): void {
    this.userProfileService.addBook(this.newBook).subscribe(() => {
      this.books.push(this.newBook);
      this.newBook = {
        cover: '',
        title: '',
        genre: '',
        condition: '',
        plot: '',
      };
      this.showAddBookModal = false;
    });
  }

  onCoverSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.newBook.cover = reader.result as string;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  openBookModal(book: any) {
    this.selectedBook = book;
  }

  closeModal() {
    this.selectedBook = null;
  }

  openAddBookModal() {
    this.showAddBookModal = true;
  }

  closeAddBookModal() {
    this.showAddBookModal = false;
  }
}
