import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {BienService} from '../../service/bien.service';
import {Bien} from '../../Models/bien';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-all-property',
  imports: [
    RouterLink,
    NgClass,
    SidebarComponent ,
    TopbarComponent,
    FooterAdminComponent,
    NgFor,
    NgIf],
  templateUrl: './all-property.component.html',
  styleUrl: './all-property.component.scss'
})
export class AllPropertyComponent implements OnInit{


  activeSidebar:boolean = true
  biens: Bien[] = [];
  isLoading: boolean = false;
  pageActuelle: number = 1;
  taillePage: number = 5;
  constructor(private bienService: BienService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadMyBiens();
  }

  get biensPagines(): any[] {
    const debut = (this.pageActuelle - 1) * this.taillePage;
    const fin = debut + this.taillePage;

    return this.biens.slice(debut, fin);
  }

  get nombrePages(): number {
    return Math.ceil(this.biens.length / this.taillePage);
  }

  get pages(): number[] {
    return Array.from(
      { length: this.nombrePages },
      (_, i) => i + 1
    );
  }

  changerPage(page: number): void {
    if (page >= 1 && page <= this.nombrePages) {
      this.pageActuelle = page;
    }
  }

  pagePrecedente(): void {
    this.changerPage(this.pageActuelle - 1);
  }

  pageSuivante(): void {
    this.changerPage(this.pageActuelle + 1);
  }

  loadMyBiens() {

    this.isLoading = true;

    this.bienService.getMyBiens().subscribe({
      next: (data) => {
        this.biens = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }


  deleteBien(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer ce bien ?'
    );

    if (!confirmation) {
      return;
    }

    this.bienService.deleteBien(id).subscribe({

      next: () => {

        this.toastr.success(
          'Bien supprimé avec succès',
          'Succès',
          {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right'
          }
        );

        // Supprimer directement de la liste affichée
        this.biens = this.biens.filter(
          bien => bien.id !== id
        );
      },

      error: (err) => {

        console.error('Erreur suppression :', err);

        this.toastr.error(
          'Impossible de supprimer ce bien',
          'Erreur',
          {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-right'
          }
        );
      }

    });
  }
}
