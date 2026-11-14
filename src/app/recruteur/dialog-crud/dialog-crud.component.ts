import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OffreEmploi } from '../../../model/offre.model';
import { OffresService } from '../../service-Offre/offres.service';


@Component({
  selector: 'app-dialog-crud',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './dialog-crud.component.html',
  styleUrl: './dialog-crud.component.css'
})
export class DialogCrudComponent implements OnInit{

  nouvelleOffre: OffreEmploi = new OffreEmploi();

    constructor(private offreEmploiService: OffresService , private offreservice:OffresService) {
      this.offreservice.id_utilisateur.subscribe(data=>{
        this.nouvelleOffre.publie_par=data
      })
     }

  ngOnInit(): void {
    
  }

  ajouterOffre(): void {
    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0); // Ignorer l'heure pour la comparaison
  
    if (new Date(this.nouvelleOffre.date_limite!) < aujourdHui) {
      alert('La date limite doit être ultérieure à la date actuelle.');
      return;
    }
  
    // Envoyer l'offre au serveur Django
    this.offreEmploiService.ajouterOffre(this.nouvelleOffre).subscribe(
      (data: OffreEmploi) => {
        console.log('Offre ajoutée avec succès', data);
        this.nouvelleOffre = new OffreEmploi(); // Réinitialiser le formulaire
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'offre', error);
      }
    );

}}
