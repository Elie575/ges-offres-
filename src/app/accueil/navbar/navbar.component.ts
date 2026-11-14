import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../../logout/logout.component';
import { LanguageService, Langue } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {afficherAuth = false;
user: any;
  constructor(public dialog: MatDialog) { }
  openLoginModal(): void {
    this.afficherAuth = false;if (this.dialog.openDialogs.length > 0) {
      return;
    }
    
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '1000px',
      maxWidth: '95vw',
      height: 'auto',
      maxHeight: '95vh',
      panelClass:'auth-dialog',
      data: { mode: 'login' },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
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


  openSignupModal(): void {
    this.afficherAuth = false;if (this.dialog.openDialogs.length > 0) {
      return;
    }
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '1070px',
      maxWidth: '80vw',
      height: '6600px',
      maxHeight: '85vh',

      panelClass:'auth-dialog',
      data: { mode: 'signup' },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Signup modal has been closed');
    });
    
  }languageService = inject(LanguageService);

  get langue(): Langue {
    return this.languageService.langue();
  }
  
  changerLangue(event: Event): void {
    const valeur = (event.target as HTMLSelectElement).value;
  
    if (valeur === 'fr' || valeur === 'en') {
      this.languageService.changerLangue(valeur);
    }

  }}
