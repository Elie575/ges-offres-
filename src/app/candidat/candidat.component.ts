import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { ProfilService } from '../service-profil/profil.service';
import { CommonModule } from '@angular/common';
import { OffresService } from '../service-Offre/offres.service';
import { OffreEmploi } from '../../model/offre.model';
import { SearchAppComponent } from './search-app/search-app.component';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { exper } from '../../model/exper.model';
import { comp } from '../../model/competence';
import { formation } from '../../model/formation';
import { lang } from '../../model/langue';
import { certificat } from '../../model/certification';
import { Cv } from '../../model/cv.model';
import { CVService } from '../service-Cv/cv.service';
import { AuthService } from '../service/auth.service';


declare var bootstrap: any;

@Component({
  selector: 'app-candidat',
  standalone: true,
  imports: [CommonModule, SearchAppComponent, ReactiveFormsModule ],
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})

export class CandidatComponent implements OnInit {


  private elementRef = inject(ElementRef);
  private router = inject(Router);
  private authService = inject(AuthService);
  
  profileMenuOpen = false;
  
  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
  
    if (!this.elementRef.nativeElement.contains(target)) {
      this.profileMenuOpen = false;
    }
  }
  
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.profileMenuOpen = false;
  }
  
  ouvrirProfil(): void {
    this.profileMenuOpen = false;
  
    const role = this.utilisateur?.role;
  
    if (role === 'Recruteur') {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/');
    }
  }
  
  ouvrirParametres(): void {
    this.profileMenuOpen = false;
    const role = this.utilisateur?.role;
  
    if (role === 'Recruteur') {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/');
    }
  }
  
  deconnecter(): void {
    this.profileMenuOpen = false;
    const role = this.utilisateur?.role;
  
    if (role === '') {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/');
    }
  }
  @ViewChild('fileInput') fileInput!: ElementRef;

  postuler(offre: OffreEmploi): void {
    if (!offre) {
      return;
    }

    console.log('Offre sélectionnée pour postuler :', offre);
    this.ouvrirImportCV();
  }
 
  
  postulat: OffreEmploi[] = [];
  fichierSelectionne: File | null = null;

  // Formulaire de CV
  cvForm: FormGroup;
  photoUrl: File | null = null;
  image!: File;
  utilisateur: any;
  currentComponent?: string= 'offres';
  offres?: OffreEmploi[];
  

  // Modèles d'entités
  exper: exper = new exper();
  comp: comp = new comp();
  format: formation = new formation();
  lan: lang = new lang();
  cert: certificat = new certificat();
  cv: Cv = new Cv();

  // Icône de déconnexion
  deconnexion = faSignOutAlt;
toggleComponent: any;
erreur: any;

  constructor(
    private fb: FormBuilder,
    private cvService: CVService,
    private utilisateurService: ProfilService,
    private offreservice: OffresService
  ) {
    this.cvForm = this.fb.group({
      photoUrl: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      linkedin: [''],
      titre: ['', Validators.required],
      profil: ['', Validators.required],
      experiences: this.fb.array([]),
      formations: this.fb.array([]),
      competences: this.fb.array([]),
      langues: this.fb.array([]),
      certifications: this.fb.array([]),
      centresInteret: this.fb.array([]),
      references: ['']
      
    });
  }  
  user = {
    photoUrl: '',
    nom: '',
    email: '',
    code: '',
    role: '',
    contact: ''
  };
 
  ngOnInit(): void {
    this.chargerUtilisateurConnecte();
    
    this.offreservice.selectOffreC().subscribe((data) => {
      this.offres = data;
    });
  }

  // Charger l'utilisateur connecté
  

  chargerUtilisateurConnecte(): void {
    this.utilisateurService.getUtilisateurConnecte().subscribe({
      next: (data: any) => {
        console.log('Réponse complète de Django :', data);
  
        // Récupérer l'utilisateur selon le format de la réponse
        const resultat = Array.isArray(data)
          ? data[0]
          : data?.utilisateur ?? data?.user ?? data;
  
        if (!resultat) {
          this.utilisateur = null;
          console.warn('Aucun utilisateur reçu.');
          return;
        }
  
        // Récupérer les champs du profil
        const nom =
          resultat.nom ??
          resultat.name ??
          resultat.username ??
          resultat.nom_utilisateur ??
          '';
  
        const photo =
          resultat.photo ??
          resultat.image ??
          resultat.photoUrl ??
          null;
  
        // Enregistrer les informations reçues
        this.utilisateur = {
          ...resultat,
          nom,
          photo
        };
  
        // Synchroniser l'objet user utilisé éventuellement dans le HTML
        this.user = {
          photoUrl: photo ?? '',
          nom: nom,
          email: resultat.email ?? '',
          code: resultat.code ?? '',
          role: resultat.role ?? '',
          contact: resultat.contact ?? ''
        };
  
        console.log('Profil chargé :', this.utilisateur);
        console.log('Nom du profil :', this.utilisateur.nom);
      },
  
      error: (error: any) => {
        console.error(
          'Erreur lors du chargement du profil :',
          error
        );
      }
    });
  }
  

  // Ouvrir le modal de postulation
  ouvrirModal(offre: any): void {
    const modalElement = document.getElementById('postulerModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Sélection d'un fichier
  selectionnerFichier(event: any): void {
    if (event.target.files.length > 0) {
      this.fichierSelectionne = event.target.files[0];
    }
  }

  // Simulation d'un envoi de fichier
  envoyerFichier(): void {
    if (this.fichierSelectionne) {
      alert(`Fichier "${this.fichierSelectionne.name}" envoyé avec succès !`);
      this.fichierSelectionne = null;

      const modalElement = document.getElementById('postulerModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    } else {
      alert("Veuillez sélectionner un fichier PDF.");
    }
  }

  // Gestion du changement de photo
  onPhotoChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.image = file;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.cv.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Soumettre le CV
  ajoutcv(): void {
    const formData = this.cvForm.value;
    formData.photo = this.photoUrl;

    const form: FormData = new FormData();
    if (this.image) {
      form.append('photo', this.image);
    }
    form.append('profil', this.cv.profil);

    this.cvService.ajoutCv(form).subscribe();
    this.cvService.experience(this.exper).subscribe();
    this.cvService.competences(this.comp).subscribe();
    this.cvService.formation(this.format).subscribe();
    this.cvService.langues(this.lan).subscribe();
    this.cvService.certifications(this.cert).subscribe(() => {
      alert('CV soumis avec succès !');
      this.router.navigate(['/Candidat']);
    });
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/Premier']);
  }

  showComponent(component: string): void {
    this.currentComponent = component;
  }

  // Getters pour les FormArray
  get experiences(): FormArray {
    return this.cvForm.get('experiences') as FormArray;
  }

  get formations(): FormArray {
    return this.cvForm.get('formations') as FormArray;
  }

  get competences(): FormArray {
    return this.cvForm.get('competences') as FormArray;
  }

  get langues(): FormArray {
    return this.cvForm.get('langues') as FormArray;
  }

  get certifications(): FormArray {
    return this.cvForm.get('certifications') as FormArray;
  }

  // Méthodes pour ajouter/supprimer des éléments dynamiques
  addExperience(): void {
    this.experiences.push(this.fb.group({
      entreprise: ['', Validators.required],
      poste: ['', Validators.required],
      dates: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  addFormation(): void {
    this.formations.push(this.fb.group({
      etablissement: ['', Validators.required],
      diplome: ['', Validators.required],
      dates: ['', Validators.required]
    }));
  }

  removeFormation(index: number): void {
    this.formations.removeAt(index);
  }

  addCompetence(): void {
    this.competences.push(this.fb.control('', Validators.required));
  }

  removeCompetence(index: number): void {
    this.competences.removeAt(index);
  }

  addLangue(): void {
    this.langues.push(this.fb.group({
      langue: ['', Validators.required],
      niveau: ['', Validators.required]
    }));
  }

  removeLangue(index: number): void {
    this.langues.removeAt(index);
  }

  addCertification(): void {
    this.certifications.push(this.fb.control('', Validators.required));
  }

  removeCertification(index: number): void {
    this.certifications.removeAt(index);
  }

  onSubmit(): void {}

   // Méthode pour sauvegarder le profil
   saveProfile() {
    console.log('Profil sauvegardé :', this.user);
    alert('Profil mis à jour avec succès !');
  }
 

/** 🔹 Ouvrir le modal pour importer un CV */

ouvrirImportCV(): void {
  this.fileInput.nativeElement.click();
}


/** 🔹 Fermer un modal Bootstrap */
fermerModal(modalId: string): void {
  const modalElement = document.getElementById(modalId);
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }
}

/** 🔹 Rediriger vers le composant de création de CV */
creerCv(): void {
  this.fermerModal('choixCvModal'); // Ferme le modal avant de rediriger
  this.router.navigate(['/CreerCV']);
}


// Fonction pour gérer le fichier sélectionné
gererFichierSelectionne(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const fichier = input.files[0];
    console.log('Fichier sélectionné:', fichier.name);
    // Vous pouvez maintenant envoyer le fichier à votre backend
  }

}
}
