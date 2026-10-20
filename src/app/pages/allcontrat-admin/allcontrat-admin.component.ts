import { Component } from '@angular/core';
import {Contrat} from '../../Models/contrat';
import {ContratService} from '../../service/contrat.service';
import {RouterLink} from '@angular/router';
import {DecimalPipe, NgClass, NgFor, NgIf} from '@angular/common';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import { CommonModule, DatePipe, SlicePipe  } from '@angular/common';
import {TopBarAdminComponent} from '../../components/top-bar-admin/top-bar-admin.component';
@Component({
  selector: 'app-allcontrat-admin',
  imports: [
    RouterLink,
    NgClass,
    DecimalPipe,
    SidebarAdminComponent ,
    TopBarAdminComponent,
    FooterAdminComponent,
    CommonModule,
    DatePipe,
    SlicePipe,
    NgFor,
    NgIf],
  templateUrl: './allcontrat-admin.component.html',
  styleUrl: './allcontrat-admin.component.scss'
})
export class ALLcontratAdminComponent {
  contrats: Contrat[] = [];

  activeSidebar: boolean = true;

  pageActuelle: number = 1;
  elementsParPage: number = 4;

  constructor(
    private contratService: ContratService
  ) {}

  ngOnInit(): void {
    this.getAllContrats();
  }

  getAllContrats(): void {

    this.contratService.getAllContrats().subscribe({

      next: (data) => {

        console.log('Contrats récupérés :', data);

        this.contrats = data;
        this.pageActuelle = 1;
      },

      error: (err) => {

        console.error(
          'Erreur récupération contrats :',
          err
        );
      }

    });
  }


  // =========================
  // PAGINATION
  // =========================

  get contratsPagines(): Contrat[] {

    const debut =
      (this.pageActuelle - 1) * this.elementsParPage;

    return this.contrats.slice(
      debut,
      debut + this.elementsParPage
    );
  }


  get nombrePages(): number {

    return Math.ceil(
      this.contrats.length / this.elementsParPage
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


  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }
}
