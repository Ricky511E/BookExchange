import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  interestedBooks: any[] = [];
  ownBooks: any[] = [];

  private placeholderInterested = [
    { title: 'Dune', author: 'Herbert' },
    { title: 'Fahrenheit 451', author: 'Bradbury' }
  ];
  private placeholderOwn = [
    { title: 'Il piccolo principe', author: 'Saint-Exupéry' },
    { title: 'La coscienza di Zeno', author: 'Svevo' }
  ];

  selectedInterested: any = null;
  selectedOwn: any = null;
  showConfirmModal = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInterested();
    this.loadOwn();
  }

  loadInterested(): void {
    this.http.get<any[]>('http://localhost:8080/library/interested')
      .pipe(catchError(() => of(this.placeholderInterested)))
      .subscribe(data => this.interestedBooks = data);
  }

  loadOwn(): void {
    this.http.get<any[]>('http://localhost:8080/library/own')
      .pipe(catchError(() => of(this.placeholderOwn)))
      .subscribe(data => this.ownBooks = data);
  }

  openConfirm(): void {
    if (this.selectedInterested && this.selectedOwn) {
      this.showConfirmModal = true;
    }
  }

  confirmSwap(): void {
    // Rimuovo e scambio
    const iIdx = this.interestedBooks.indexOf(this.selectedInterested);
    const oIdx = this.ownBooks.indexOf(this.selectedOwn);
    if (iIdx > -1) this.interestedBooks.splice(iIdx, 1);
    if (oIdx > -1) this.ownBooks.splice(oIdx, 1);
    this.interestedBooks.push(this.selectedOwn);
    this.ownBooks.push(this.selectedInterested);

    // Reset selezioni e chiudo modal
    this.selectedInterested = null;
    this.selectedOwn = null;
    this.showConfirmModal = false;
  }

  cancelSwap(): void {
    this.showConfirmModal = false;
  }
}