import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  offres = []; // Remplace avec tes offres depuis l'API
  fichierSelectionne: File | null = null;
currentComponent: any;

  // Fonction pour ouvrir le modal
  ouvrirModal(offre: any) {
    const modalElement = document.getElementById('postulerModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  // Gestion de la sélection de fichier
  selectionnerFichier(event: any) {
    if (event.target.files.length > 0) {
      this.fichierSelectionne = event.target.files[0];
    }
  }

  // Simulation d'un envoi de fichier
  envoyerFichier() {
    if (this.fichierSelectionne) {
      alert(`Fichier "${this.fichierSelectionne.name}" envoyé avec succès !`);
      this.fichierSelectionne = null;
      const modalElement = document.getElementById('postulerModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    } else {
      alert("Veuillez sélectionner un fichier PDF.");
    }
  }

}
