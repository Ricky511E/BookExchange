import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
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
    category: '',
    condition: '',
    plot: '',
  };

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.getUserProfile().subscribe((profile) => {
      this.userProfile = profile;
    });

    this.userProfileService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  addBook(): void {
    this.userProfileService.addBook(this.newBook).subscribe(() => {
      this.books.push(this.newBook);
      this.newBook = {
        cover: '',
        title: '',
        category: '',
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
