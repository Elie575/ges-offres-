import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cv } from '../../../model/cv.model';
import { CVService } from '../../service-Cv/cv.service';
import { Router } from '@angular/router';
import { jsPDF} from "jspdf" ;
import { exper } from '../../../model/exper.model';
import { comp } from '../../../model/competence';
import { formation } from '../../../model/formation';
import { lang } from '../../../model/langue';
import { certificat } from '../../../model/certification';

@Component({
  selector: 'app-telechargement-cv',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './telechargement-cv.component.html',
  styleUrl: './telechargement-cv.component.css'
})
export class TelechargementCVComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  cvForm: FormGroup;
  photoUrl: File | null = null; // Pour stocker la photo téléversée

  constructor(private CV: FormBuilder,private router: Router, private CVService: CVService) {
    this.cvForm = this.CV.group({
      photoUrl: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      linkedin: [''],
      titre: ['', Validators.required],
      profil: ['', Validators.required],
      experiences: this.CV.array([]),
      formations: this.CV.array([]),
      competences: this.CV.array([]),
      langues: this.CV.array([]),
      certifications: this.CV.array([]),
      centresInteret: this.CV.array([]),
      references: ['']
    });
  }
  image!: File;
  // Méthode pour gérer le changement de photo
  public onPhotoChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.image = file; // Stocker le fichier photo
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.cv.photo = e.target.result; // Met à jour l'URL de la photo
      };
      reader.readAsDataURL(file);

    }
  }

  public triggerFileInput() {
    this.fileInput.nativeElement.click(); // Ouvre le champ fichier
  }
  
  // Soumission du formulaire
 exper: exper = new exper();
 comp: comp = new comp() ;
 format: formation = new formation() ;
 lan: lang = new lang() ;
 cert: certificat = new certificat() ;

  ajoutcv() {
    const formData = this.cvForm.value;
    formData.photo = this.photoUrl; // Ajouter le fichier photo

    // Générer le PDF
    // this.generatePDF(formData);
    const form : FormData = new FormData;
    if (this.image){form.append('photo', this.image)}
    form.append('photo', this.image);
    form.append('profil', this.cv.profil);
    
    this.CVService.ajoutCv(form).subscribe()
    
    this.CVService.experience(this.exper).subscribe()

    this.CVService.competences(this.comp).subscribe()

    this.CVService.formation(this.format).subscribe()

    this.CVService.langues(this.lan).subscribe()

    this.CVService.certifications(this.cert).subscribe((response:any) =>{ {
      alert('terminée')
      this.router.navigate(['/Candidat']);
     }}
      
    )
    
   

  }

  onSubmit() {
  }

  // Getters pour les FormArray
  get experiences() {
    return this.cvForm.get('experiences') as FormArray;
  }

  get formations() {
    return this.cvForm.get('formations') as FormArray;
  }

  get competences() {
    return this.cvForm.get('competences') as FormArray;
  }

  get langues() {
    return this.cvForm.get('langues') as FormArray;
  }

  get certifications() {
    return this.cvForm.get('certifications') as FormArray;
  }

 
 

  // Méthodes pour ajouter/supprimer des éléments dynamiques
  addExperience() {
    const experienceGroup = this.CV.group({
      entreprise: ['', Validators.required],
      poste: ['', Validators.required],
      dates: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.experiences.push(experienceGroup);
  }

  removeExperience(index: number) {
    this.experiences.removeAt(index);
  }

  addFormation() {
    const formationGroup = this.CV.group({
      etablissement: ['', Validators.required],
      diplome: ['', Validators.required],
      dates: ['', Validators.required]
    });
    this.formations.push(formationGroup);
  }

  removeFormation(index: number) {
    this.formations.removeAt(index);
  }

  addCompetence() {
    this.competences.push(this.CV.control('', Validators.required));
  }

  removeCompetence(index: number) {
    this.competences.removeAt(index);
  }

  addLangue() {
    const langueGroup = this.CV.group({
      langue: ['', Validators.required],
      niveau: ['', Validators.required]
    });
    this.langues.push(langueGroup);
  }

  removeLangue(index: number) {
    this.langues.removeAt(index);
  }

  addCertification() {
    this.certifications.push(this.CV.control('', Validators.required));
  }

  removeCertification(index: number) {
    this.certifications.removeAt(index);
  }

  

  // Générer le PDF
  generatePDF(data: any) {
    const doc = new (window as any).jsPDF();

    // Ajouter la photo en haut à droite
    const photoUrl = this.cvForm.get('photoUrl')?.value; // Récupérer l'URL de la photo
    if (photoUrl) {
      doc.addImage(photoUrl, 'JPEG', 160, 10, 40, 40); // Position et taille de la photo
    }

    // Ajouter les informations du CV
    doc.setFontSize(12);
    doc.text(`Nom : ${data.nom} ${data.prenom}`, 10, 20);
    doc.text(`Email : ${data.email}`, 10, 30);
    doc.text(`Téléphone : ${data.telephone}`, 10, 40);
    doc.text(`Titre : ${data.titre}`, 10, 50);
    doc.text(`Profil : ${data.profil}`, 10, 60);

    // Ajouter les expériences
    let y = 70;
    data.experiences.forEach((exp: any) => {
      doc.text(`Expérience : ${exp.entreprise} - ${exp.poste} (${exp.dates})`, 10, y);
      doc.text(`Description : ${exp.description}`, 15, y + 10);
      y += 20;
    });

    // Ajouter les formations
    data.formations.forEach((formation: any) => {
      doc.text(`Formation : ${formation.etablissement} - ${formation.diplome} (${formation.dates})`, 10, y);
      y += 10;
    });

    // Ajouter les compétences
    doc.text('Compétences :', 10, y);
    data.competences.forEach((competence: string, index: number) => {
      doc.text(`- ${competence}`, 15, y + 10 + (index * 10));
    });
    y += 10 + (data.competences.length * 10);

    // Ajouter les langues
    doc.text('Langues :', 10, y);
    data.langues.forEach((langue: any, index: number) => {
      doc.text(`- ${langue.langue} (${langue.niveau})`, 15, y + 10 + (index * 10));
    });
    y += 10 + (data.langues.length * 10);

    // Ajouter les certifications
    doc.text('Certifications :', 10, y);
    data.certifications.forEach((certification: string, index: number) => {
      doc.text(`- ${certification}`, 15, y + 10 + (index * 10));
    });
    y += 10 + (data.certifications.length * 10);

    // Sauvegarder le PDF
    doc.save('cv.pdf');
  }
cv : Cv = new Cv();

}