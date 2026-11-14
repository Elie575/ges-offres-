import {RouterModule, Routes } from '@angular/router';
import {NgModule } from '@angular/core';
import {RecruteurComponent} from './recruteur/recruteur.component';
import {DiscussionCandidatComponent} from './candidat/discussion-candidat/discussion-candidat.component';
import {DiscussionRecruteurComponent} from './recruteur/discussion-recruteur/discussion-recruteur.component';
import {DialogCrudComponent} from './recruteur/dialog-crud/dialog-crud.component';
import {CandidatComponent} from './candidat/candidat.component';
import {GererProfileComponent} from './gerer-profile/gerer-profile.component';
import {AccueilComponent } from './accueil/accueil.component';
import {TelechargementCVComponent } from './candidat/telechargement-cv/telechargement-cv.component';
import {AdminAdminComponent} from './admin-admin/admin-admin.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    
    
    { path:'auth_1', component:LogoutComponent },
    { path:'Tâche1', component:DialogCrudComponent },
    { path:'Parametre', component:GererProfileComponent},
    { path:'RecruDisc', component:DiscussionRecruteurComponent },
    { path:'CandidatDisc', component:DiscussionCandidatComponent },
    { path:'Premier' , component:AccueilComponent },
    { path:'Candidat', component:CandidatComponent },
    { path:'Recruteur', component:RecruteurComponent },
    { path:'Admin', component:AdminAdminComponent },
    { path:'Postulation', component:TelechargementCVComponent },
    { path:'**', component:AccueilComponent },];

    @NgModule({
        imports : [RouterModule.forRoot(routes)],
        exports : [RouterModule]
   })
   export class AppRoutingModule{}
   
