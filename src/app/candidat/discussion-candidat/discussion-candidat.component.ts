import { Component } from '@angular/core';
import { SearchAppComponent } from '../search-app/search-app.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-discussion-candidat',
  imports: [SearchAppComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './discussion-candidat.component.html',
  styleUrl: './discussion-candidat.component.css'
})
export class DiscussionCandidatComponent {
  // Liste des candidats avec messages associés
  candidates = [
    {
      name: 'Alice ',
      photo: 'assets/microsoft.png',
      messages: [
        { sender: 'recruiter', content: 'Bonjour, pouvez-vous m\'envoyer votre CV à jour ?', timestamp: '10:00 AM' },
        { sender: 'candidate', content: 'Bonjour, bien sûr. Je vous l\'envoie tout de suite.', timestamp: '10:05 AM' }
      ]
    },
    {
      name: ' Martin',
      photo: 'assets/linkedin.png',
      messages: [
        { sender: 'recruiter', content: 'Quand seriez-vous disponible pour un entretien ?', timestamp: '11:00 AM' },
        { sender: 'candidate', content: 'Je suis disponible lundi prochain.', timestamp: '11:05 AM' }
      ]
    }
  ];

  selectedCandidate: any = null; // Candidat actuellement sélectionné
  newMessage: string = ''; // Nouveau message en cours de saisie

  // Sélectionner un candidat
  selectCandidate(candidate: any): void {
    this.selectedCandidate = candidate;
  }

  // Envoyer un message
  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.selectedCandidate.messages.push({
        sender: 'recruter',
        content: this.newMessage.trim(),
        timestamp: timestamp
      });
      this.newMessage = ''; // Réinitialiser le champ de saisie
    }
  }

}
