import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {AboutUserComponent} from '../../components/about-user/about-user.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {RouterModule} from '@angular/router';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {TopBarAdminComponent} from '../../components/top-bar-admin/top-bar-admin.component';
import {UserService} from '../../service/user.service';
import {ClientService} from '../../service/client.service';
import {BienService} from '../../service/bien.service';
import {ContratService} from '../../service/contrat.service';
import {PropriétaireService} from '../../service/propriétaire.service';
import {User} from '../../Models/user';
import {Bien} from '../../Models/bien';
import {Typebien} from '../../Enum/typebien';

@Component({
  selector: 'app-dashboard-admin',
  imports: [CommonModule, FormsModule, NavbarComponent,SidebarAdminComponent, TopBarAdminComponent,AboutUserComponent,FooterAdminComponent,RouterModule                                 // ← Nécessaire pour routerLink
  ],  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent implements OnInit{
  activeSidebar:boolean = true
  totalUtilisateurs = 0;
  totalClients = 0;
  totalProprietaires = 0;
  totalBiens = 0;
  totalContrats = 0;
  pourcentageClients: number = 0;
  pourcentageProprietaires: number = 0;
  pourcentageAdmins: number = 0;
  utilisateursRecents: User[] = [];
  biensRecents: Bien[] = [];
  Typebien = Typebien;
  contratsEnAttente = 0;
  contratsEnCours = 0;
  contratsTermines = 0;
  evolutionUtilisateurs = [
    { mois: 'Jan', nombre: 0 },
    { mois: 'Fév', nombre: 0 },
    { mois: 'Mar', nombre: 0 },
    { mois: 'Avr', nombre: 0 },
    { mois: 'Mai', nombre: 0 },
    { mois: 'Juin', nombre: 0 },
    { mois: 'Juil', nombre: 0 },
    { mois: 'Août', nombre: 0 },
    { mois: 'Sep', nombre: 0 },
    { mois: 'Oct', nombre: 0 },
    { mois: 'Nov', nombre: 0 },
    { mois: 'Déc', nombre: 0 }
  ];
  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private proprietaireService:PropriétaireService,
    private bienService: BienService,
    private contratService: ContratService
  ) {}


  ngOnInit(): void {
    this.loadUtilisateurs();
    this.loadClients();
    this.loadProprietaires();
    this.loadBiens();
    this.loadContrats();
  }

  loadUtilisateurs(): void {

    this.userService.getAllUsers().subscribe({

      next: (data) => {

        this.totalUtilisateurs = data.length;
        this.utilisateursRecents = data
          .filter(user => user.creationDate)
          .sort(
            (a, b) =>
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
          )
          .slice(0, 3);

        // =========================
        // RÉPARTITION
        // =========================

        const clients = data.filter(
          user => user.role === 'CLIENT'
        ).length;

        const proprietaires = data.filter(
          user => user.role === 'PROPRIETAIRE'
        ).length;

        const admins = data.filter(
          user => user.role === 'ADMIN'
        ).length;

        if (this.totalUtilisateurs > 0) {

          this.pourcentageClients = Math.round(
            (clients / this.totalUtilisateurs) * 100
          );

          this.pourcentageProprietaires = Math.round(
            (proprietaires / this.totalUtilisateurs) * 100
          );

          this.pourcentageAdmins = Math.round(
            (admins / this.totalUtilisateurs) * 100
          );
        }


        // =========================
        // ÉVOLUTION PAR MOIS
        // =========================

        this.evolutionUtilisateurs.forEach(item => {
          item.nombre = 0;
        });

        const anneeActuelle = new Date().getFullYear();

        data.forEach(user => {

          if (user.creationDate) {

            const dateCreation = new Date(user.creationDate);

            if (dateCreation.getFullYear() === anneeActuelle) {

              const numeroMois = dateCreation.getMonth();

              this.evolutionUtilisateurs[numeroMois].nombre++;
            }
          }
        });

        console.log(
          'Evolution utilisateurs :',
          this.evolutionUtilisateurs
        );
      },

      error: (err) => {
        console.error(
          'Erreur récupération utilisateurs :',
          err
        );
      }

    });
  }



  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.totalClients = data.length;
      },
      error: (err) => console.error(err)
    });
  }

  loadProprietaires(): void {
    this.proprietaireService.getAllProprietaires().subscribe({
      next: (data) => {
        this.totalProprietaires = data.length;
      },
      error: (err) => console.error(err)
    });
  }

  loadBiens(): void {

    this.bienService.getBiens().subscribe({

      next: (data) => {

        this.totalBiens = data.length;

        // Les 3 derniers biens ajoutés
        this.biensRecents = [...data]
          .sort((a, b) => b.id - a.id)
          .slice(0, 3);
      },

      error: (err) => {
        console.error('Erreur récupération biens :', err);
      }

    });
  }

  loadContrats(): void {

    this.contratService.getAllContrats().subscribe({

      next: (data) => {

        // Total
        this.totalContrats = data.length;

        // En attente
        this.contratsEnAttente = data.filter(
          contrat => contrat.statut === 'EN_ATTENTE'
        ).length;

        // En cours / signé
        this.contratsEnCours = data.filter(
          contrat => contrat.statut === 'EN_COURS'
        ).length;

        // Terminés
        this.contratsTermines = data.filter(
          contrat => contrat.statut === 'TERMINE'
        ).length;

      },

      error: (err) => {
        console.error(
          'Erreur récupération contrats :',
          err
        );
      }

    });
  }





  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }

  calculerHauteurBarre(nombre: number): number {

    if (nombre === 0) {
      return 0;
    }

    const maximum = Math.max(
      ...this.evolutionUtilisateurs.map(item => item.nombre),
      1
    );

    return (nombre / maximum) * 170;
  }


}
