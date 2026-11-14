import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/connecter';

  constructor(private http: HttpClient) {}
  connexion(utilisateur:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/?email=${utilisateur.email}&code=${utilisateur.code}&photo=${utilisateur.photoUrl}`);
  }
}