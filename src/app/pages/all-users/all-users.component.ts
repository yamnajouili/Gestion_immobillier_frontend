import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-all-users',
  imports: [
    RouterLink,
    NgClass,
    SidebarAdminComponent ,
    TopbarComponent,
    FooterAdminComponent,
    NgFor,
    NgIf],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent {
  activeSidebar:boolean = true;
  utilisateurs: any[] = [];

  pageActuelle: number = 1;
  elementsParPage: number = 5;
  userIdASupprimer: number | null = null;
  modalSuppression = false;
constructor(private userService:UserService ) {
}

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe({

      next: (users) => {
        this.utilisateurs = users;
      },

      error: (err) => {
        console.error(
          'Erreur récupération utilisateurs :',
          err
        );
      }

    });
  }




  get nombrePages(): number {
    return Math.ceil(
      this.utilisateurs.length / this.elementsParPage
    );
  }


  get utilisateursPagines(): any[] {

    const debut =
      (this.pageActuelle - 1) * this.elementsParPage;

    const fin =
      debut + this.elementsParPage;

    return this.utilisateurs.slice(debut, fin);
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


  toggleClass(): void {

    this.activeSidebar = !this.activeSidebar;

  }


  ouvrirModalSuppression(id: number): void {
    this.userIdASupprimer = id;
    this.modalSuppression = true;
  }

  fermerModalSuppression(): void {
    this.modalSuppression = false;
    this.userIdASupprimer = null;
  }

  confirmerSuppression(): void {
    if (this.userIdASupprimer === null) return;

    this.userService.deleteUser(this.userIdASupprimer).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(
          user => user.id !== this.userIdASupprimer
        );

        this.fermerModalSuppression();
      },
      error: (err) => {
        console.error('Erreur suppression utilisateur :', err);
      }
    });
  }
}
