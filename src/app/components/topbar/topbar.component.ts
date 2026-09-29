import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Output  } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AuthentificationServiceService} from '../../service/authentification-service.service';
import {ContratService} from '../../service/contrat.service';
// import {NgClickOutsideDirective} from 'ng-click-outside2';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,

    RouterLink
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  nombreNotifications: number = 0;
  contratsEnAttente: any[] = [];
  constructor(private authService:AuthentificationServiceService,private contratService:ContratService) {
  }
  ngOnInit(): void {
    this.getNotificationsContrats();
  }
  @Output() toggleClass = new EventEmitter<void>();

  emitToggleClassEvent() {
    this.toggleClass.emit();
  }

  countryManu:boolean = false;

  countryDropdown(){
    this.countryManu = !this.countryManu;
  }
  onClickedOutside(e: Event) {
    this.countryManu = false;
  }

  notificationManu:boolean = false;

  notificationDropdown(){
    this.notificationManu = !this.notificationManu;
  }
  onClickedOutside2(e: Event) {
    this.notificationManu = false;
  }

  userManu:boolean = false;

  userDropdown(){
    this.userManu = !this.userManu;
  }
  onClickedOutside3(e: Event) {
    this.userManu = false;
  }
  getNotificationsContrats(): void {

    this.contratService.getMesContrats().subscribe({

      next: (data) => {

        // Récupérer les contrats en attente
        this.contratsEnAttente = data.filter(
          contrat => contrat.statut === 'EN_ATTENTE'
        );

        // Nombre de notifications
        this.nombreNotifications = this.contratsEnAttente.length;

        console.log(
          'Contrats en attente :',
          this.contratsEnAttente
        );

        console.log(
          'Nombre de notifications :',
          this.nombreNotifications
        );
      },

      error: (error) => {

        console.error(
          'Erreur récupération notifications :',
          error
        );

        this.contratsEnAttente = [];
        this.nombreNotifications = 0;
      }

    });
  }
  logout(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.authService.logout();

  }
}
