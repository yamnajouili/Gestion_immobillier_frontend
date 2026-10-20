import {Component, OnInit} from '@angular/core';
import { Client } from '../../Models/client';
import {ClientService} from '../../service/client.service';
import {RouterLink} from '@angular/router';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {TopBarAdminComponent} from '../../components/top-bar-admin/top-bar-admin.component';

@Component({
  selector: 'app-allclient',
  imports: [
    RouterLink,
    NgClass,
    SidebarAdminComponent ,
    TopBarAdminComponent,
    FooterAdminComponent,
    NgFor,
    NgIf],
  templateUrl: './allclient.component.html',
  styleUrl: './allclient.component.scss'
})
export class AllclientComponent implements OnInit{

  clients: Client[] = [];
  pageActuelle: number = 1;
  elementsParPage: number = 5;
  activeSidebar:boolean = true;
  clientIdASupprimer: number | null = null;
  modalSuppression = false;
  erreurSuppression: string = '';
  constructor(
    private clientService: ClientService
  ) {}


  ouvrirModalSuppression(id: number): void {
    this.clientIdASupprimer = id;
    this.erreurSuppression = '';
    this.modalSuppression = true;
  }

  fermerModalSuppression(): void {
    this.modalSuppression = false;
    this.clientIdASupprimer = null;
    this.erreurSuppression = '';
  }

  confirmerSuppression(): void {

    if (this.clientIdASupprimer === null) return;

    const id = this.clientIdASupprimer;

    this.erreurSuppression = '';

    this.clientService.deleteClient(id).subscribe({

      next: () => {

        this.clients = this.clients.filter(
          client => client.id !== id
        );

        this.fermerModalSuppression();
      },

      error: (err) => {

        console.error('Erreur suppression client :', err);

        this.erreurSuppression =
          err.error?.error ||
          'Impossible de supprimer ce client.';
      }

    });
  }

  toggleClass(): void {

    this.activeSidebar = !this.activeSidebar;

  }
  ngOnInit(): void {

    this.getAllClients();

  }


  // ==========================
  // GET ALL CLIENTS
  // ==========================

  getAllClients(): void {

    this.clientService.getAllClients().subscribe({

      next: (data) => {

        console.log('Clients récupérés :', data);

        this.clients = data;
        console.log("les client ++++++++++++++++++++++++++++++++++++",this.clients)

        this.pageActuelle = 1;
      },

      error: (err) => {

        console.error(
          'Erreur récupération clients :',
          err
        );

      }

    });
  }
  deleteClient(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer ce client ?'
    );

    if (!confirmation) {
      return;
    }

    console.log('Client à supprimer :', id);
  }

  get clientsPagines(): Client[] {

    const debut =
      (this.pageActuelle - 1) * this.elementsParPage;

    const fin =
      debut + this.elementsParPage;

    return this.clients.slice(debut, fin);
  }

  get nombrePages(): number {
    return Math.ceil(
      this.clients.length / this.elementsParPage
    );
  }

  get pages(): number[] {
    return Array.from(
      { length: this.nombrePages },
      (_, i) => i + 1
    );
  }

  changerPage(page: number): void {
    this.pageActuelle = page;
  }

  pagePrecedente(): void {
    if (this.pageActuelle > 1) {
      this.pageActuelle--;
    }
  }

  pageSuivante(): void {
    if (this.pageActuelle < this.nombrePages) {
      this.pageActuelle++;
    }
  }

}
