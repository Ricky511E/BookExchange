import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get('/api/user/profile'); // cambia l'endpoint in base al tuo back
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>('/api/user/books');
  }

  addBook(book: any): Observable<any> {
    return this.http.post('/api/user/books', book);
  }
}
