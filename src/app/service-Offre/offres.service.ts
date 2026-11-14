import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OffreEmploi } from '../../model/offre.model';

@Injectable({
  providedIn: 'root'
})
export class OffresService {

  private apiUrl = 'http://localhost:8000/api/offres-emploi/'; 

  private id_ut = new BehaviorSubject<number>(0) ;
  id_utilisateur = this.id_ut.asObservable();

  constructor(private http: HttpClient) { }

  changerUt(id_ut: number): void {
    this.id_ut.next(id_ut);
  }

  ajouterOffre(offre: OffreEmploi): Observable<OffreEmploi> {
    return this.http.post<OffreEmploi>(this.apiUrl, offre);
  }

  selectOffre(utilisateur: number): Observable<OffreEmploi[]> {
    return this.http.get<OffreEmploi[]>(`${this.apiUrl}?utilisateur=${utilisateur}`);
  }

  selectOffreC(): Observable<OffreEmploi[]> {  // Correction: remove 
    return this.http.get<OffreEmploi[]>(`${this.apiUrl}`);
  }

  validerOffre(offre:OffreEmploi): Observable<OffreEmploi[]> {
    const url = `${this.apiUrl}${offre.id}/`;  // Correction: added 
    return this.http.put<OffreEmploi[]>(url, offre);
  }

  rejeterOffre(offre:OffreEmploi): Observable<OffreEmploi[]> {
    const url = `${this.apiUrl}${offre.id}/`;  // Correction: fixed 
    return this.http.put<OffreEmploi[]>(url, offre);
  }
}
