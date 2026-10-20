
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { UserService } from '../../service/user.service';
import { UserDetail } from '../../Models/user-detail';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {TopBarAdminComponent} from '../../components/top-bar-admin/top-bar-admin.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-showoneadmin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarAdminComponent,
    TopBarAdminComponent,
    FooterAdminComponent
  ],
  templateUrl: './showoneadmin.component.html',
  styleUrl: './showoneadmin.component.scss'
})
export class ShowoneadminComponent implements OnInit {

  utilisateur: UserDetail =new UserDetail();

  chargement = true;
  erreur = '';
  activeSidebar = true;
  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.erreur = 'Identifiant utilisateur invalide';
      this.chargement = false;
      return;
    }

    this.userService.getUserById(id).subscribe({
      next: (user: UserDetail) => {
        this.utilisateur = user;
        this.chargement = false;
        console.log("phpto user",this.utilisateur.photoProfil)
      },
      error: (err) => {
        console.error(err);
        this.erreur = 'Impossible de charger cet utilisateur';
        this.chargement = false;
      }
    });
  }

  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }
}
