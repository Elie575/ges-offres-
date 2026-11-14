import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private apiUrl = 'http://localhost:8000/api/utilisateur-connecte/';

  constructor(private http: HttpClient) { }

  getUtilisateurConnecte(): Observable<any> {
    const idcandidat=localStorage.getItem('userid')
   
    return this.http.get(`${this.apiUrl}${idcandidat}`, { responseType: 'json' });


  }

}