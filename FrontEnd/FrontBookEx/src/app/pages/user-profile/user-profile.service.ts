import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get('/api/user/profile');
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/books');
  }

  addBook(book: any): Observable<any> {
    return this.http.post('http://localhost:8080/books', book);
  }

  // Metodo per aggiornare l'immagine profilo (con URL dell'immagine)
  updateProfileImage(newImageUrl: string): Observable<any> {
    return this.http.put('/api/user/profile/image', { image: newImageUrl }); // questo se si usa la put
    // return this.http.post('/api/user/profile/image', { image: newImageUrl }); // questo la post
  }

}
