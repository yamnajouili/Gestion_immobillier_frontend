import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import * as feather from 'feather-icons';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {Changepasswordrequest} from '../../Models/changepasswordrequest';
import {UserService} from '../../service/user.service';
import {ClientService} from '../../service/client.service';
import {PropriétaireService} from '../../service/propriétaire.service';
import {FormsModule} from '@angular/forms';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
@Component({
  selector: 'app-profile-setting',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    SidebarComponent,
    TopbarComponent,
    FooterAdminComponent ,SidebaruserComponent ],
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.scss'
})
export class ProfileSettingComponent {
  activeSidebar:boolean = true
  passwordData: Changepasswordrequest = new Changepasswordrequest();
  user: any = null;

  loadingProfile: boolean = false;
  loadingPassword: boolean = false;

  successProfile: string = '';
  errorProfile: string = '';

  successPassword: string = '';
  errorPassword: string = '';


  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private proprietaireService:PropriétaireService
  ) {}


  ngOnInit(): void {
    this.getUserConnecte();
  }



  // ==========================================
  // RECUPERER UTILISATEUR CONNECTE
  // ==========================================

  getUserConnecte(): void {

    this.userService.getUserConnecte().subscribe({

      next: (data) => {

        this.user = data;

        console.log(
          'Utilisateur connecté :',
          this.user
        );

      },

      error: (error) => {

        console.error(
          'Erreur récupération utilisateur :',
          error
        );

      }

    });

  }


  // ==========================================
  // MODIFIER PROFIL
  // ==========================================

  updateProfile(): void {

    if (!this.user) {
      return;
    }

    this.successProfile = '';
    this.errorProfile = '';
    this.loadingProfile = true;


    // Informations communes
    const data: any = {

      nom: this.user.nom,
      telephone: this.user.telephone,
      poste: this.user.poste

    };


    // ======================================
    // CLIENT
    // ======================================

    if (this.user.role === 'CLIENT') {

      this.clientService
        .updateProfile(data)
        .subscribe({

          next: (response) => {

            this.user = response;

            this.loadingProfile = false;

            this.successProfile =
              'Profil modifié avec succès.';

          },

          error: (error) => {

            console.error(
              'Erreur modification client :',
              error
            );

            this.loadingProfile = false;

            this.errorProfile =
              'Erreur lors de la modification du profil.';

          }

        });

      return;
    }


    // ======================================
    // PROPRIETAIRE
    // ======================================

    if (this.user.role === 'PROPRIETAIRE') {

      data.typeProprietaire =
        this.user.typeProprietaire;

      data.adresseProfessionnelle =
        this.user.adresseProfessionnelle;

      data.numeroSiret =
        this.user.numeroSiret;

      data.nomAgence =
        this.user.nomAgence;


      this.proprietaireService
        .updateProfile(data)
        .subscribe({

          next: (response) => {

            this.user = response;

            this.loadingProfile = false;

            this.successProfile =
              'Profil modifié avec succès.';

          },

          error: (error) => {

            console.error(
              'Erreur modification propriétaire :',
              error
            );

            this.loadingProfile = false;

            this.errorProfile =
              'Erreur lors de la modification du profil.';

          }

        });

      return;
    }


    this.loadingProfile = false;

    this.errorProfile =
      'Rôle utilisateur non reconnu.';

  }


  // ==========================================
  // CHANGER MOT DE PASSE
  // ==========================================

  changePassword(): void {

    this.successPassword = '';
    this.errorPassword = '';


    // Vérifier champs
    if (
      !this.passwordData.currentPassword ||
      !this.passwordData.newPassword ||
      !this.passwordData.confirmationPassword
    ) {

      this.errorPassword =
        'Veuillez remplir tous les champs.';

      return;
    }


    // Vérifier confirmation
    if (
      this.passwordData.newPassword !==
      this.passwordData.confirmationPassword
    ) {

      this.errorPassword =
        'Les nouveaux mots de passe ne correspondent pas.';

      return;
    }


    this.loadingPassword = true;


    this.userService
      .changePassword(this.passwordData)
      .subscribe({

        next: (response) => {

          console.log(
            'Mot de passe modifié :',
            response
          );

          this.loadingPassword = false;

          this.successPassword =
            'Mot de passe modifié avec succès.';


          // vider formulaire
          this.passwordData =
            new Changepasswordrequest();

        },

        error: (error) => {

          console.error(
            'Erreur changement mot de passe :',
            error
          );

          this.loadingPassword = false;

          if (error.status === 403) {

            this.errorPassword =
              'Vous n’êtes pas autorisé à effectuer cette opération.';

          } else {

            this.errorPassword =
              'Mot de passe actuel incorrect.';

          }

        }

      });

  }
  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }

  ngAfterViewInit() {
    feather.replace();
  }
}
