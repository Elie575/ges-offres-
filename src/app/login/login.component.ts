
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule,MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../service-connexion/login.service';
import { OffresService } from '../service-Offre/offres.service';
import { LogoutComponent } from '../logout/logout.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  // ==================================================
  // MOT DE PASSE
  // ==================================================
  hidePassword = true;


  // ==================================================
  // ÉTAT DU CHARGEMENT
  // ==================================================

  loading = false;
  // Permet d'afficher "Connexion réussie"
  loginSuccess = false;


  // ==================================================
  // INFORMATIONS UTILISATEUR
  // ==================================================

  user = {
    photoUrl: '',
    email: '',
    code: ''
  };


  // ==================================================
  // MESSAGE D'ERREUR
  // ==================================================

  errorMessage = '';


  // ==================================================
  // CONSTRUCTEUR
  // ==================================================

  constructor(
    private router: Router,

    private loginService: LoginService,

    private offreservice: OffresService,

    private dialog: MatDialog,

    public dialogRef: MatDialogRef<LoginComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}


  // ==================================================
  // CONNEXION
  // ==================================================

  connexion(): void {

    // Réinitialiser les messages
    this.errorMessage = '';

    this.loginSuccess = false;


    // --------------------------------------------------
    // Vérification des champs
    // --------------------------------------------------

    if (!this.user.email || !this.user.code) {

      this.errorMessage =
        'Veuillez remplir votre email et votre mot de passe.';

      return;
    }


    // --------------------------------------------------
    // Éviter plusieurs clics
    // --------------------------------------------------

    if (this.loading) {
      return;
    }


    // --------------------------------------------------
    // Démarrer le chargement
    // --------------------------------------------------

    this.loading = true;


    // --------------------------------------------------
    // Appel du service de connexion
    // --------------------------------------------------

    this.loginService.connexion(this.user).pipe(

      catchError((error) => {

        console.error(
          'Erreur de connexion :',
          error
        );


        // Arrêter le loading
        this.loading = false;


        // Message d'erreur
        this.errorMessage =
          'Email ou mot de passe incorrect.';


        return of(null);

      })

    ).subscribe((response: any) => {


      // ==================================================
      // CONNEXION ÉCHOUÉE
      // ==================================================

      if (!response) {
        return;
      }


      console.log(
        'Connexion réussie :',
        response
      );


      // ==================================================
      // ENREGISTRER LE TOKEN
      // ==================================================

      if (response.token) {

        localStorage.setItem(
          'token',
          response.token
        );
      }


      // ==================================================
      // ENREGISTRER L'ID UTILISATEUR
      // ==================================================

      if (response.id) {

        localStorage.setItem(
          'userid',
          response.id.toString()
        );


        // Mise à jour utilisateur
        this.offreservice.changerUt(
          response.id
        );
      }


      // ==================================================
      // ENREGISTRER LE RÔLE
      // ==================================================

      if (response.role) {

        localStorage.setItem(
          'role',
          response.role
        );
      }


      // ==================================================
      // AFFICHER LA RÉUSSITE
      // ==================================================

      this.loginSuccess = true;


      /*
       * On garde l'animation pendant 1 seconde.
       * Ensuite on ferme le modal et on redirige.
       */

      setTimeout(() => {


        // ------------------------------------------------
        // Fermer le modal
        // ------------------------------------------------

        this.dialogRef.close(true);


        // ------------------------------------------------
        // Redirection selon le rôle
        // ------------------------------------------------

        switch (
          response.role?.toLowerCase()
        ) {

          case 'recruteur':

            this.router.navigate([
              '/Recruteur'
            ]);

            break;


          case 'admin':

            this.router.navigate([
              '/Admin'
            ]);

            break;


          case 'candidat':

            this.router.navigate([
              '/Candidat'
            ]);

            break;


          default:

            console.warn(
              'Rôle inconnu :',
              response.role
            );


            this.router.navigate([
              '/'
            ]);

            break;
        }

      }, 1000);

    });
  }


  // ==================================================
  // AFFICHER / CACHER LE MOT DE PASSE
  // ==================================================

  togglePassword(): void {

    this.hidePassword =
      !this.hidePassword;
  }


  // ==================================================
  // OUVRIR LE MODAL INSCRIPTION
  // ==================================================

  openSignupModal(): void {

    // Fermer le modal connexion
    this.dialogRef.close();


    // Ouvrir le modal inscription
    const dialogRef = this.dialog.open(
      LogoutComponent,
      {
        width: '1190px',
        maxWidth: '95vw',
        height: '660px',
        maxHeight: '95vh',
        panelClass:'auth-dialog',
        data: { mode: 'signup' }
        
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      console.log(
        'Modal inscription fermé'
      );
    });

  }
  // ==================================================
  // CHANGEMENT PHOTO
  // ==================================================

  onPhotoChange(event: Event): void {
    const input =
      event.target as HTMLInputElement;
    const file =
      input.files?.[0];
    if (!file) {
      return;
    }
    const reader =
      new FileReader();
      reader.onload = () => {
      this.user.photoUrl =
      reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  // ==================================================
  // FERMER LE MODAL
  // ==================================================
    fermer(): void {
    this.dialogRef.close();
  }

}
