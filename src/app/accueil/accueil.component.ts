
import { Component, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';
import { LoginComponent } from '../login/login.component';

interface Offre {
  id: number;
  titre: string;
  entreprise: string;
  description: string;
  localisation: string;
  categorie: string;
  contrat: string;
  salaire: string;
  icone: string;
}

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,FormsModule,
    MatDialogModule
  ],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  recherche = '';
  categorieActive = 'Toutes';
  afficherAuth = false;
  offreSelectionnee: Offre | null = null;

  filtres = [
    'Toutes',
    'Informatique',
    'BTP',
    'Logistique',
    'Administration'
  ];

  offres: Offre[] = [
    {
      id: 1,
      titre: 'Développeur Web Full Stack',
      entreprise: 'Entreprise Informatique',
      description: 'Développement et maintenance des applications web.',
      localisation: 'Antananarivo',
      categorie: 'Informatique',
      contrat: 'CDI',
      salaire: 'À négocier',
      icone: 'fas fa-code'
    },
    {
      id: 2,
      titre: "Conducteur d'engins",
      entreprise: 'Entreprise BTP',
      description: 'Conduite et entretien des engins de chantier.',
      localisation: 'Fianarantsoa',
      categorie: 'BTP',
      contrat: 'CDD',
      salaire: 'À négocier',
      icone: 'fas fa-truck'
    },
    {
      id: 3,
      titre: 'Gestionnaire de stock',
      entreprise: 'Entreprise Logistique',
      description: 'Gestion des stocks et suivi des inventaires.',
      localisation: 'Toamasina',
      categorie: 'Logistique',
      contrat: 'CDI',
      salaire: 'À négocier',
      icone: 'fas fa-boxes-stacked'
    },
    {
      id: 4,
      titre: 'Technicien Informatique',
      entreprise: 'Services IT',
      description: 'Maintenance et assistance informatique.',
      localisation: 'Antananarivo',
      categorie: 'Informatique',
      contrat: 'Stage',
      salaire: 'Non précisé',
      icone: 'fas fa-laptop-code'
    },
    {
      id: 5,
      titre: 'Assistant Administratif',
      entreprise: 'Entreprise de services',
      description: 'Gestion des documents et tâches administratives.',
      localisation: 'Fianarantsoa',
      categorie: 'Administration',
      contrat: 'CDD',
      salaire: 'À négocier',
      icone: 'fas fa-file-lines'
    },
    {
      id: 6,
      titre: 'Chef de chantier',
      entreprise: 'Construction Madagascar',
      description: 'Organisation et supervision des travaux.',
      localisation: 'Antsirabe',
      categorie: 'BTP',
      contrat: 'CDI',
      salaire: 'À négocier',
      icone: 'fas fa-helmet-safety'
    }
  ];
  constructor(public dialog: MatDialog) { }

  get offresFiltrees(): Offre[] {
    const terme = this.recherche
      .trim()
      .toLowerCase();

    return this.offres.filter(offre => {
      const categorieOk =
        this.categorieActive === 'Toutes' ||
        offre.categorie === this.categorieActive;

      const texte = [
        offre.titre,
        offre.entreprise,
        offre.description,
        offre.localisation
      ].join(' ').toLowerCase();

      return categorieOk && texte.includes(terme);
    });
  }

  rechercherOffres(): void {
    document.getElementById('offres')
      ?.scrollIntoView({
        behavior: 'smooth'
      });
  }

  filtrerCategorie(categorie: string): void {
    this.categorieActive = categorie;
  }

  postuler(offre: Offre): void {
    this.offreSelectionnee = offre;
    this.afficherAuth = true;
  }

  fermerAuth(): void {
    this.afficherAuth = false;
    this.offreSelectionnee = null;
  }

  ouvrirConnexion(): void {
    this.afficherAuth = false;
    const dialogRef = this.dialog.open(LoginComponent, {
        width: '1000px',
        maxWidth: '95vw',
        height: 'auto',
        maxHeight: '95vh',
        panelClass:'auth-dialog',
        data: { mode: 'login' },
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(() => {
        console.log('Login modal has been closed');
      });
    }
    menuOpen = false;
  
    toggleMenu(): void {
      this.menuOpen = !this.menuOpen;
    }
  
    closeMenu(): void {
      this.menuOpen = false;
    }
  

    ouvrirInscription(): void {
      this.afficherAuth = false;
      const dialogRef = this.dialog.open(LogoutComponent, {
        width: '1070px',
        maxWidth: '80vw',
        height: '6600px',
        maxHeight: '85vh',
  
        panelClass:'auth-dialog',
        data: { mode: 'signup' },
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(() => {
        console.log('Signup modal has been closed');
      });
      
  }
}
