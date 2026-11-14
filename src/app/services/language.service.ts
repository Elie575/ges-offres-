
import { Injectable, signal } from '@angular/core';

export type Langue = 'fr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  langue = signal<Langue>('fr');

  changerLangue(langue: Langue): void {
    this.langue.set(langue);
  }

  traduire(fr: string, en: string): string {
    return this.langue() === 'fr' ? fr : en;
  }
}
