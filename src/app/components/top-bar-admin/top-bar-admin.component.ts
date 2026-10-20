import {Component, EventEmitter, Output} from '@angular/core';
import {AuthentificationServiceService} from '../../service/authentification-service.service';
import {ContratService} from '../../service/contrat.service';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';
import {environment} from '../../environments/environment';
import {User} from '../../Models/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-top-bar-admin',
  imports: [
    CommonModule,

    RouterLink
  ],
  templateUrl: './top-bar-admin.component.html',
  styleUrl: './top-bar-admin.component.scss'
})
export class TopBarAdminComponent {
  nombreNotifications: number = 0;
  contratsEnAttente: any[] = [];
  user:User=new User();

  constructor(private authService:AuthentificationServiceService,private contratService:ContratService,private userservice:UserService ) {
  }
  ngOnInit(): void {
    this.getNotificationsContrats();
    this. getUserConnecte();

  }
  @Output() toggleClass = new EventEmitter<void>();


  getUserConnecte() {
    this.userservice.getUserConnecte().subscribe(
      value => {
        this.user = value;

        console.log("récupération de utilisateur connecté avec succes******************** : " + JSON.stringify(value));
      },
      error => {
        console.error('Erreur lors de la récupération de utilisateur connecté', error);
      }
    );
  }

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
  apiUrl = environment.apiUrl;

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
    this.authService.logoutAdmin();

  }
}
