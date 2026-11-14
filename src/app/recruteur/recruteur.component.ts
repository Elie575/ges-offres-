import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfilService } from '../service-profil/profil.service';
import { OffresService } from '../service-Offre/offres.service';
import { OffreEmploi } from '../../model/offre.model';
import { SearchAppComponent } from '../candidat/search-app/search-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruteur',
  imports: [RouterLink, SearchAppComponent, CommonModule,ReactiveFormsModule ,FormsModule],
  templateUrl: './recruteur.component.html',
  styleUrls: ['./recruteur.component.css']
})
export class RecruteurComponent implements OnInit {

  utilisateur: any;
  nouvelleOffre: OffreEmploi = new OffreEmploi();
  offres?: OffreEmploi[];
  
  currentComponent: string | undefined;
  router: any;

  constructor(private utilisateurService: ProfilService, private offreservice: OffresService) { this.offreservice.id_utilisateur.subscribe(data=>{
    this.nouvelleOffre.publie_par=data
  })}

  ngOnInit(): void {
    this.chargerUtilisateurConnecte();
    this.chargerOffres();
  }
  

  chargerUtilisateurConnecte(): void {
    this.utilisateurService.getUtilisateurConnecte()?.subscribe(
      (data: any) => {
        this.utilisateur = data;
        this.utilisateur.photo = URL.createObjectURL(data);
      },
      (error) => {
        console.error('Erreur lors du chargement des informations de l\'utilisateur', error);
      }
    );
  }

  chargerOffres(): void {
    this.offreservice.id_utilisateur.subscribe(id_utilisateur => {
      this.nouvelleOffre.publie_par = id_utilisateur;
      this.offreservice.selectOffre(id_utilisateur).subscribe(
        (data) => this.offres = data,
        (error) => console.error('Erreur lors du chargement des offres', error)
      );
    });
  }

  ajouterOffre(): void {
    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);

    if (new Date(this.nouvelleOffre.date_limite!) < aujourdHui) {
      alert('La date limite doit être ultérieure à la date actuelle.');
      return;
    }

    this.offreservice.ajouterOffre(this.nouvelleOffre).subscribe(
      (data: OffreEmploi) => {
        console.log('Offre ajoutée avec succès', data);
        this.nouvelleOffre = new OffreEmploi(); // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'offre', error);
      }
    );
  }

  showComponent(component: string): void {
    this.currentComponent = component;
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/Premier']);
  }
 
}
