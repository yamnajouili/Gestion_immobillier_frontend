import { Component } from '@angular/core';
import {environment} from '../../environments/environment';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {ClientService} from '../../service/client.service';
import {CommonModule} from '@angular/common';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {TopBarAdminComponent} from '../../components/top-bar-admin/top-bar-admin.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import { Client } from '../../Models/client';
@Component({
  selector: 'app-showoneclient',
  imports: [
    CommonModule,
    RouterModule,
    SidebarAdminComponent,
    TopBarAdminComponent,
    FooterAdminComponent
  ],
  templateUrl: './showoneclient.component.html',
  styleUrl: './showoneclient.component.scss'
})
export class ShowoneclientComponent {
  client: Client =new Client();

  chargement = true;
  erreur = '';
  photoErreur = false;
  activeSidebar = true;

  apiUrl =environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.erreur = 'Identifiant client invalide';
      this.chargement = false;
      return;
    }

    this.clientService.getClientById(id).subscribe({
      next: (response) => {
        this.client = response;
        this.photoErreur = false;
        this.chargement = false;
      },
      error: (err) => {
        console.error(err);
        this.erreur = 'Impossible de charger ce client';
        this.chargement = false;
      }
    });
  }

  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }
}
