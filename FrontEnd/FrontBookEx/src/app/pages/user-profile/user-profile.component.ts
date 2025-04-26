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
    image: '',
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

    this.userProfileService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile;
    });

    this.userProfileService.getBooks().subscribe((books) => {
      this.books = books;
    });
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

  showImageModal = false;
  newProfileImageUrl = '';

  openImageModal() {
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
  }

  // Metodo per aggiornare l'immagine profilo
  updateProfileImage() {
    this.userProfileService
      .updateProfileImage(this.newProfileImageUrl)
      .subscribe(
        (response) => {
          // Aggiorna l'immagine localmente dopo il salvataggio
          this.userProfile.image = this.newProfileImageUrl;
          this.closeImageModal();
          alert('Immagine del profilo aggiornata con successo!');
        },
        (error) => {
          console.error("Errore durante l'aggiornamento dell'immagine:", error);
          alert(
            "Si è verificato un errore durante l'aggiornamento dell'immagine."
          );
        }
      );
  }
}
