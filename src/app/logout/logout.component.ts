
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { LoginComponent } from '../login/login.component';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-logout',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],

  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  // =========================================================
  // FICHIER PHOTO
  // =========================================================

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;


  // =========================================================
  // UTILISATEUR
  // =========================================================

  user = {
    photoUrl: '',
    nom: '',
    email: '',
    code: '',
    role: 'candidat',
    contact: ''
  };


  // =========================================================
  // VARIABLES
  // =========================================================

  image: File | null = null;

  errorMessage = '';

  /**
   * true  = inscription en cours
   * false = inscription terminée
   */
  loading = false;

  /**
   * true = inscription réussie
   */
  profileCreationSuccess = false;


  /**
   * Permet d'afficher le mot de passe
   */
  hidePassword = true;


  // =========================================================
  // CONSTRUCTEUR
  // =========================================================

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,

    public dialogRef: MatDialogRef<LogoutComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}


  // =========================================================
  // MOT DE PASSE
  // =========================================================

  public togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }


  // =========================================================
  // OUVRIR LOGIN
  // =========================================================

  public openLoginModal(): void {

    this.dialogRef.close();

    setTimeout(() => {

      this.dialog.open(LoginComponent, {
        width: '1000px',
        maxWidth: '100vw',
        height: 'auto',
        maxHeight: '100vh',
        panelClass: 'auth-dialog',
        data: {
          mode: 'login'
        }
      });

    }, 100);
  }


  // =========================================================
  // OUVRIR SÉLECTEUR PHOTO
  // =========================================================

  public triggerFileInput(): void {

    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }


  // =========================================================
  // CHANGER PHOTO
  // =========================================================

  public onPhotoChange(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];


    // Vérification du format
    if (!allowedTypes.includes(file.type)) {

      this.errorMessage =
        'Format accepté : JPG, PNG ou WEBP.';

      input.value = '';

      return;
    }


    // Vérification de la taille
    if (file.size > 5 * 1024 * 1024) {

      this.errorMessage =
        'La photo ne doit pas dépasser 5 Mo.';

      input.value = '';

      return;
    }


    // Enregistrer le fichier
    this.image = file;

    this.errorMessage = '';


    // Prévisualisation
    const reader = new FileReader();

    reader.onload = () => {

      this.user.photoUrl =
        reader.result as string;
    };

    reader.readAsDataURL(file);
  }


  // =========================================================
  // INSCRIPTION
  // =========================================================

  public ajouter(): void {

    // Empêcher plusieurs clics
    if (this.loading) {
      return;
    }


    // Réinitialiser les messages
    this.errorMessage = '';
    this.profileCreationSuccess = false;


    // =======================================================
    // VALIDATION
    // =======================================================

    if (!this.user.nom.trim()) {

      this.errorMessage =
        'Veuillez saisir votre nom.';

      return;
    }


    if (!this.user.email.trim()) {

      this.errorMessage =
        'Veuillez saisir votre adresse e-mail.';

      return;
    }


    if (!this.user.code) {

      this.errorMessage =
        'Veuillez saisir un mot de passe.';

      return;
    }


    if (this.user.code.length < 6) {

      this.errorMessage =
        'Le mot de passe doit contenir au moins 6 caractères.';

      return;
    }


    if (!this.user.role) {

      this.errorMessage =
        'Veuillez sélectionner votre rôle.';

      return;
    }


    if (!this.user.contact.trim()) {

      this.errorMessage =
        'Veuillez saisir votre numéro de téléphone.';

      return;
    }


    // =======================================================
    // FORMDATA
    // =======================================================

    const formData = new FormData();


    if (this.image) {

      formData.append(
        'photo',
        this.image,
        this.image.name
      );
    }


    formData.append(
      'nom',
      this.user.nom.trim()
    );

    formData.append(
      'email',
      this.user.email.trim()
    );

    formData.append(
      'code',
      this.user.code
    );

    formData.append(
      'role',
      this.user.role
    );

    formData.append(
      'contact',
      this.user.contact.trim()
    );


    // =======================================================
    // DEBUG
    // =======================================================

    console.log(
      'Données utilisateur :',
      this.user
    );

    console.log(
      'Photo sélectionnée :',
      this.image
    );


    // =======================================================
    // DÉBUT CHARGEMENT
    // =======================================================

    this.loading = true;


    // =======================================================
    // ENVOI VERS DJANGO
    // =======================================================

    this.authService
      .inscription(formData)

      .pipe(

        catchError((error) => {

          console.error(
            "Erreur d'inscription :",
            error
          );


          // Arrêter le spinner
          this.loading = false;


          // Désactiver le succès
          this.profileCreationSuccess = false;


          // =================================================
          // GESTION DES ERREURS
          // =================================================

          if (error.status === 400) {

            this.errorMessage =
              "Les informations fournies sont incorrectes ou l'e-mail existe déjà.";

          }

          else if (error.status === 0) {

            this.errorMessage =
              "Impossible de contacter le serveur Django. Vérifiez que le serveur est démarré.";

          }

          else {

            this.errorMessage =
              "Échec de l'inscription. Veuillez réessayer.";
          }


          return of(null);
        })

      )


      // =====================================================
      // RÉPONSE SERVEUR
      // =====================================================

      .subscribe({

        next: (response: any) => {

          // Une erreur a déjà été traitée
          if (!response) {
            return;
          }


          console.log(
            'Réponse serveur :',
            response
          );


          // =================================================
          // INSCRIPTION RÉUSSIE
          // =================================================

          this.loading = false;

          this.errorMessage = '';

          this.profileCreationSuccess = true;


          // =================================================
          // TOKEN
          // =================================================

          if (response.token) {

            localStorage.setItem(
              'token',
              response.token
            );
          }


          console.log(
            'Inscription réussie !'
          );


          // =================================================
          // ATTENDRE 2 SECONDES
          // =================================================

          setTimeout(() => {

            console.log(
              'Fermeture du modal...'
            );


            // Fermer le modal
            this.dialogRef.close({
              success: true,
              user: response
            });


            // Redirection après fermeture
            this.router.navigate([
              '/Premier'
            ]);

          }, 2000);
        },


        error: (error) => {

          console.error(
            'Erreur inattendue :',
            error
          );

          this.loading = false;
          this.profileCreationSuccess = false;

        }

      });
  }


  // =========================================================
  // SAUVEGARDER LE PROFIL
  // =========================================================

  public saveProfile(): void {

    if (
      !this.user.nom ||
      !this.user.email ||
      !this.user.code ||
      !this.user.contact
    ) {

      this.errorMessage =
        'Veuillez remplir tous les champs obligatoires.';

      return;
    }


    if (
      this.user.role === 'recruteur' &&
      !this.user.contact
    ) {

      this.errorMessage =
        'Veuillez fournir un contact pour le recruteur.';

      return;
    }


    console.log(
      'Données enregistrées :',
      this.user
    );


    this.router.navigate([
      '/accueil'
    ]);
  }


  // =========================================================
  // FERMER LE MODAL
  // =========================================================

  public fermer(): void {

    // Ne pas fermer pendant l'inscription
    if (this.loading) {
      return;
    }


    this.dialogRef.close();
  }

}

