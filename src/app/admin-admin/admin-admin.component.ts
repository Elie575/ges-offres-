import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import ApexCharts from 'apexcharts';
import { faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OffreEmploi } from '../../model/offre.model';
import { OffresService } from '../service-Offre/offres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, MatTableModule, MatPaginatorModule],
  templateUrl: './admin-admin.component.html',
  styleUrls: ['./admin-admin.component.css'],
})
export class AdminAdminComponent implements OnInit, AfterViewInit {
  // Icônes FontAwesome
  deconnexion = faSignOutAlt;
  search = faSearch;

  // Gestion de la sidebar et affichage dynamique des composants
  sidebarOpen = false;
  currentComponent: string = 'statistique';

  // Données pour les offres d'emploi
  offres: OffreEmploi[] = [];
  displayedColumns: string[] = ['titre', 'description', 'exigences', 'type_contrat', 'localisation', 'plage_salaire', 'cree_le', 'actions'];
  dataSource = new MatTableDataSource<OffreEmploi>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private offreService: OffresService, private router: Router) {}

  ngOnInit(): void {
    this.loadOffres();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  /** Charger les offres d'emploi */
  private loadOffres(): void {
    this.offreService.selectOffreC().subscribe({
      next: (data) => {
        this.offres = data;
        this.dataSource.data = this.offres;
      },
      error: (err) => console.error('Erreur lors du chargement des offres:', err),
    });
  }

  /** Basculer l'affichage de la sidebar */
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /** Afficher dynamiquement un composant */
  showComponent(component: string): void {
    this.currentComponent = component;
    if (component === 'statistique') {
      setTimeout(() => {
        this.clearCharts();
        this.renderBarChart();
        this.renderLineChart();
      }, 100);
    }
  }

  /** Supprimer les anciens graphiques pour éviter les superpositions */
  private clearCharts(): void {
    ['#bar-chart', '#line-chart', '#pie-chart'].forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) element.innerHTML = '';
    });
  }

  /** Afficher un graphique en barres */
  private renderBarChart(): void {
    const options = {
      series: [{ data: [10, 8, 6, 4] }],
      chart: { type: 'bar', height: 350 },
      xaxis: { categories: ['Candidature', 'Candidat', 'Recruteur', 'Offres'] },
    };
    new ApexCharts(document.querySelector('#bar-chart')!, options).render();
  }

  /** Afficher un graphique en ligne */
  private renderLineChart(): void {
    const options = {
      series: [{ name: 'Candidats', data: [5, 10, 15, 20, 25] }],
      chart: { type: 'line', height: 350},
      xaxis: { categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai'] },
    };
    new ApexCharts(document.querySelector('#line-chart')!, options).render();
  }

  /** Valider une offre */
  validerOffre(offre: OffreEmploi): void {
    offre.status = 'Validé';
    this.offreService.validerOffre(offre).subscribe({
      next: () => {
        this.offres = this.offres.filter((o) => o.id !== offre.id);
        this.dataSource.data = this.offres;
      },
      error: (err) => console.error('Erreur lors de la validation de l\'offre:', err),
    });
  }

  /** Rejeter une offre */
  rejeterOffre(offre: OffreEmploi): void {
    offre.status = 'Rejeté';
    this.offreService.rejeterOffre(offre).subscribe({
      next: () => {
        this.offres = this.offres.filter((o) => o.id !== offre.id);
        this.dataSource.data = this.offres;
      },
      error: (err) => console.error('Erreur lors du rejet de l\'offre:', err),
    });
  }

  /** Déconnexion de l'utilisateur */
  logout(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/Premier']);
  }
}
