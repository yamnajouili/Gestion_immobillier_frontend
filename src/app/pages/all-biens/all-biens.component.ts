import { Component } from '@angular/core';
import {BienService} from '../../service/bien.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import {Bien} from '../../Models/bien';
import {RouterLink} from '@angular/router';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';

@Component({
  selector: 'app-all-biens',
  imports: [
    RouterLink,
    NgClass,
    DecimalPipe,
    SidebarAdminComponent ,
    TopbarComponent,
    FooterAdminComponent,
    NgFor,
    NgIf],
  templateUrl: './all-biens.component.html',
  styleUrl: './all-biens.component.scss'
})
export class AllBiensComponent {
  biens: Bien[] = [];
  activeSidebar: boolean = true;
  pageActuelle: number = 1;
  elementsParPage: number = 5;
  bienIdASupprimer: number | null = null;
  modalSuppression = false;
  erreurSuppression: string = '';

  constructor(
    private bienService: BienService
  ) {}

  ngOnInit(): void {
    this.getAllBiens();
  }


  ouvrirModalSuppression(id: number): void {
    this.bienIdASupprimer = id;
    this.erreurSuppression = '';
    this.modalSuppression = true;
  }

  fermerModalSuppression(): void {
    this.modalSuppression = false;
    this.bienIdASupprimer = null;
    this.erreurSuppression = '';
  }

  confirmerSuppression(): void {

    if (this.bienIdASupprimer === null) return;

    const id = this.bienIdASupprimer;

    this.erreurSuppression = '';

    this.bienService.deleteBien(id).subscribe({

      next: () => {
        this.biens = this.biens.filter(
          bien => bien.id !== id
        );

        this.fermerModalSuppression();
      },

      error: (err) => {
        this.erreurSuppression =
          err.error?.error ||
          'Impossible de supprimer ce bien.';
      }
    });
  }






  getAllBiens(): void {

    this.bienService.getBiens().subscribe({

      next: (data) => {
        console.log('Biens récupérés :', data);

        this.biens = data;
        this.pageActuelle = 1;
      },

      error: (err) => {
        console.error('Erreur récupération des biens :', err);
      }

    });
  }


  // =========================
  // PAGINATION
  // =========================

  get biensPagines(): Bien[] {

    const debut =
      (this.pageActuelle - 1) * this.elementsParPage;

    const fin =
      debut + this.elementsParPage;

    return this.biens.slice(debut, fin);
  }


  get nombrePages(): number {

    return Math.ceil(
      this.biens.length / this.elementsParPage
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


  // =========================
  // DELETE
  // =========================

  deleteBien(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer ce bien ?'
    );

    if (!confirmation) {
      return;
    }

    this.bienService.deleteBien(id).subscribe({

      next: () => {

        console.log('Bien supprimé :', id);

        // Retirer directement de la table
        this.biens = this.biens.filter(
          bien => bien.id !== id
        );

        // Corriger la pagination si la dernière page devient vide
        if (
          this.pageActuelle > this.nombrePages &&
          this.pageActuelle > 1
        ) {
          this.pageActuelle--;
        }
      },

      error: (err) => {
        console.error(
          'Erreur suppression du bien :',
          err
        );
      }

    });
  }


  toggleClass(): void {

    this.activeSidebar = !this.activeSidebar;
  }
}
