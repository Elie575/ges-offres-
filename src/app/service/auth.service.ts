import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  deconnexion() {
    throw new Error('Method not implemented.');
  }
  register(user: { photoUrl: string; nom: string; email: string; code: string; role: string; contact: string; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://127.0.0.1:8000/api/inscrire/'

  constructor(private http: HttpClient) { }
  inscription(Utilisateur:any):Observable<any>{
    return this.http.post(this.apiUrl, Utilisateur);
  }
  getut():Observable<any>{
    return this.http.get(`${this.apiUrl}/inscrire/`);
  }
  } 
