import { Component } from '@angular/core';
import {environment} from '../../environments/environment';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {PropriétaireService} from '../../service/propriétaire.service';
import {Propriétaire} from '../../Models/propriétaire';
import {CommonModule} from '@angular/common';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {TopBarAdminComponent} from '../../components/top-bar-admin/top-bar-admin.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';

@Component({
  selector: 'app-showoneproprietaire',
  imports: [
    CommonModule,
    RouterModule,
    SidebarAdminComponent,
    TopBarAdminComponent,
    FooterAdminComponent
  ],
  templateUrl: './showoneproprietaire.component.html',
  styleUrl: './showoneproprietaire.component.scss'
})
export class ShowoneproprietaireComponent {
  proprietaire: Propriétaire =new Propriétaire();

  chargement = true;
  erreur = '';
  photoErreur = false;
  activeSidebar = true;

  apiUrl =environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private proprietaireService: PropriétaireService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.erreur = 'Identifiant du propriétaire invalide';
      this.chargement = false;
      return;
    }

    this.proprietaireService.getProprietaireById(id).subscribe({
      next: (response: Propriétaire) => {
        this.proprietaire = response;
        this.photoErreur = false;
        this.chargement = false;
      },
      error: (err) => {
        console.error('Erreur chargement propriétaire', err);
        this.erreur = 'Impossible de charger ce propriétaire';
        this.chargement = false;
      }
    });
  }

  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }
}
