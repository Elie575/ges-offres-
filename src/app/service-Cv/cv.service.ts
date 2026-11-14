import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cv } from '../../model/cv.model';
import { exper } from '../../model/exper.model';
import { comp } from '../../model/competence';
import { formation } from '../../model/formation';
import { lang } from '../../model/langue';
import { certificat } from '../../model/certification';



@Injectable({
  providedIn: 'root'
})
export class CVService {

  private apiUrl = 'http://127.0.0.1:8000/api'
  constructor(private http:HttpClient) {}
  ajoutCv(cv:FormData):Observable<any>{
    alert('validation réussi')
  return this.http.post(`${this.apiUrl}/relationCv/`,cv);
}
  
experience(exper:exper):Observable<any>{
  
    console.log(exper)
  return this.http.post('http://127.0.0.1:8000/ajoutExper/',JSON.stringify(exper));
}

formation(format:formation):Observable<any>{

  console.log(format)
return this.http.post('http://127.0.0.1:8000/ajoutForma/',JSON.stringify(format));
}


competences(compet:comp):Observable<any>{
  
  console.log(comp)
return this.http.post('http://127.0.0.1:8000/ajoutCompe/',JSON.stringify(compet));
}

langues(langue:lang):Observable<any>{

  console.log(comp)
return this.http.post('http://127.0.0.1:8000/ajoutLang/',JSON.stringify(langue));
}

certifications(certi:certificat):Observable<any>{
  
  console.log(comp)
return this.http.post('http://127.0.0.1:8000/ajoutCerti/',JSON.stringify(certi));
}

}
