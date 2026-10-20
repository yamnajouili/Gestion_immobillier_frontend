import { Component } from '@angular/core';
import {ContratService} from '../../service/contrat.service';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {Contrat} from '../../Models/contrat';
import {CommonModule} from '@angular/common';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {TopBarAdminComponent} from '../../components/top-bar-admin/top-bar-admin.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';

@Component({
  selector: 'app-showonecontratadmin',
  imports: [
    CommonModule,
    RouterModule,
    SidebarAdminComponent,
    TopBarAdminComponent,
    FooterAdminComponent
  ],
  templateUrl: './showonecontratadmin.component.html',
  styleUrl: './showonecontratadmin.component.scss'
})
export class ShowonecontratadminComponent {
  contrat: Contrat=new Contrat();
  activeSidebar = true;
  chargement = true;
  erreur = '';

  constructor(private route: ActivatedRoute, private contratService: ContratService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.erreur = 'Identifiant du contrat invalide';
      this.chargement = false;
      return;
    }

    this.contratService.getContratById(id).subscribe({
      next: (response) => {
        this.contrat = response;
        this.chargement = false;
      },
      error: (err) => {
        console.error('Erreur chargement contrat :', err);
        this.erreur = 'Impossible de charger ce contrat';
        this.chargement = false;
      }
    });
  }

  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }
}
