import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faHome, faBell} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone:true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
  faHome = faHome;
  notificationIcon = faBell;
  nomProfil = "R";
}
