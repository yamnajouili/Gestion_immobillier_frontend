import {Component, OnInit} from '@angular/core';
import {PropriétaireService} from '../../service/propriétaire.service';
import {Propriétaire} from '../../Models/propriétaire';
import {RouterLink} from '@angular/router';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {TopBarAdminComponent} from '../../components/top-bar-admin/top-bar-admin.component';

@Component({
  selector: 'app-all-proprietaire',
  imports: [
    RouterLink,
    NgClass,
    SidebarAdminComponent ,
    TopBarAdminComponent,
    FooterAdminComponent,
    NgFor,
    NgIf],
  templateUrl: './all-proprietaire.component.html',
  styleUrl: './all-proprietaire.component.scss'
})
export class AllProprietaireComponent implements OnInit{
  proprietaires: Propriétaire[] = [];

  activeSidebar: boolean = true;

  pageActuelle: number = 1;
  elementsParPage: number = 5;

  proprietaireIdASupprimer: number | null = null;
  erreurSuppression: string = '';
  modalSuppression: boolean = false;
  constructor(
    private proprietaireService:PropriétaireService
  ) {}



  ouvrirModalSuppression(id: number): void {
    this.proprietaireIdASupprimer = id;
    this.erreurSuppression = '';
    this.modalSuppression = true;
  }

  fermerModalSuppression(): void {
    this.modalSuppression = false;
    this.proprietaireIdASupprimer = null;
    this.erreurSuppression = '';
  }
  confirmerSuppression(): void {

    if (this.proprietaireIdASupprimer === null) return;

    const id = this.proprietaireIdASupprimer;

    // Effacer l'ancien message
    this.erreurSuppression = '';

    this.proprietaireService.deleteProprietaire(id).subscribe({

      next: () => {

        this.proprietaires = this.proprietaires.filter(
          proprietaire => proprietaire.id !== id
        );

        this.fermerModalSuppression();
      },

      error: (err) => {

        this.erreurSuppression =
          err.error?.error ||
          'Impossible de supprimer ce propriétaire.';
      }
    });
  }
  ngOnInit(): void {
    this.getAllProprietaires();
  }

  getAllProprietaires(): void {

    this.proprietaireService.getAllProprietaires().subscribe({

      next: (data) => {
        console.log('Propriétaires récupérés :', data);

        this.proprietaires = data;
        this.pageActuelle = 1;
      },

      error: (err) => {
        console.error(
          'Erreur récupération propriétaires :',
          err
        );
      }

    });
  }

  get proprietairesPagines(): Propriétaire[] {

    const debut =
      (this.pageActuelle - 1) * this.elementsParPage;

    const fin =
      debut + this.elementsParPage;

    return this.proprietaires.slice(debut, fin);
  }

  get nombrePages(): number {
    return Math.ceil(
      this.proprietaires.length / this.elementsParPage
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

  deleteProprietaire(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer ce propriétaire ?'
    );

    if (!confirmation) {
      return;
    }

    console.log('Propriétaire à supprimer :', id);

    // On ajoutera ensuite l'appel DELETE.
  }

  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }
}
