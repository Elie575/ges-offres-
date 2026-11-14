import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gerer-profile',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './gerer-profile.component.html',
  styleUrl: './gerer-profile.component.css'
})
export class GererProfileComponent {

@ViewChild('fileInput') fileInput!: ElementRef; // Référence au champ fichier

  user = {
    photoUrl: '', // URL de la photo de profil
    name: 'John Doe',
    email: 'johndoe@example.com',
    code: 'USER12345'
  };

  // Méthode pour déclencher l'ouverture du sélecteur de fichiers
  triggerFileInput() {
    this.fileInput.nativeElement.click(); // Ouvre le champ fichier
  }

  // Méthode pour gérer le changement de photo
  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.photoUrl = e.target.result; // Met à jour l'URL de la photo
      };
      reader.readAsDataURL(file);
    }
  }

  // Méthode pour sauvegarder le profil
  saveProfile() {
    console.log('Profil sauvegardé :', this.user);
    alert('Profil mis à jour avec succès !');
  }
}
