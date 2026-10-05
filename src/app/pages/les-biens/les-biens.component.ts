import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Bien } from '../../Models/bien';
import { Favoris } from '../../Models/favoris';

import { BienService } from '../../service/bien.service';
import { FavorisService } from '../../service/favoris.service';

import { SidebaruserComponent } from '../../components/sidebaruser/sidebaruser.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
  selector: 'app-les-biens',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    RouterLink,
    SidebaruserComponent,
    TopbarComponent
  ],
  templateUrl: './les-biens.component.html',
  styleUrl: './les-biens.component.scss'
})
export class LesBiensComponent implements OnInit {

  biens: Bien[] = [];

  isLoading: boolean = false;
  activeSidebar: boolean = true;

  // Pagination
  pageActuelle: number = 1;
  biensParPage: number = 3;

  constructor(
    private bienService: BienService,
    private router: Router,
    private favorisService: FavorisService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMyBiens();
  }


  // =====================================================
  // CHARGER LES BIENS
  // =====================================================

  loadMyBiens(): void {

    this.isLoading = true;

    this.bienService.getBiens().subscribe({

      next: (data) => {

        this.biens = data;

        console.log('Les biens :', this.biens);

        // Après récupération des biens,
        // vérifier lesquels sont favoris
        this.chargerFavoris();

        this.isLoading = false;
      },

      error: (err) => {

        console.error('Erreur récupération biens :', err);

        this.isLoading = false;
      }

    });
  }


  // =====================================================
  // CHARGER LES FAVORIS DU CLIENT
  // =====================================================

  chargerFavoris(): void {

    this.favorisService.getMesFavoris().subscribe({

      next: (favoris: any[]) => {

        console.log('Mes favoris :', favoris);

        this.biens.forEach((bien) => {

          const favoriTrouve = favoris.find(
            (favori) => favori.bienId === bien.id
          );

          bien.isFavori = !!favoriTrouve;

        });

      },

      error: (err) => {
        console.error(
          'Erreur récupération favoris :',
          err
        );
      }

    });
  }


  // =====================================================
  // AJOUTER / SUPPRIMER FAVORI
  // =====================================================

  toggleFavori(bien: Bien, event: Event): void {

    event.preventDefault();
    event.stopPropagation();

    // ---------------------------------------------
    // Déjà favori → supprimer
    // ---------------------------------------------

    if (bien.isFavori) {

      this.favorisService
        .supprimerFavorisParBienId(bien.id)
        .subscribe({

          next: () => {

            bien.isFavori = false;

            this.toastr.success(
              'Bien retiré des favoris'
            );

          },

          error: (err) => {

            console.error(
              'Erreur suppression favori :',
              err
            );

            this.toastr.error(
              'Erreur lors de la suppression'
            );
          }

        });

      return;
    }


    // ---------------------------------------------
    // Pas favori → ajouter
    // ---------------------------------------------

    const favori = new Favoris();

    favori.bienId = bien.id;

    this.favorisService
      .ajouterFavoris(favori)
      .subscribe({

        next: () => {

          bien.isFavori = true;

          this.toastr.success(
            'Bien ajouté aux favoris'
          );

        },

        error: (err) => {

          console.error(
            'Erreur ajout favori :',
            err
          );

          this.toastr.error(
            'Erreur lors de l’ajout aux favoris'
          );
        }

      });
  }


  // =====================================================
  // PAGINATION
  // =====================================================

  get biensPagines(): Bien[] {

    const debut =
      (this.pageActuelle - 1) * this.biensParPage;

    const fin =
      debut + this.biensParPage;

    return this.biens.slice(debut, fin);
  }


  get totalPages(): number {

    return Math.ceil(
      this.biens.length / this.biensParPage
    );
  }


  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }


  changerPage(page: number): void {

    if (
      page >= 1 &&
      page <= this.totalPages
    ) {

      this.pageActuelle = page;

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }
  }


  // =====================================================
  // CONTACTER PROPRIETAIRE
  // =====================================================

  contacterProprietaire(item: Bien): void {
    if (!item.proprietaire?.id) {
      console.warn('Pas de propriétaire pour ce bien', item);
      return;
    }
    this.router.navigate(['/chat'], {
      queryParams: { recipientId: item.proprietaire.id }
    });
  }


  // =====================================================
  // SIDEBAR
  // =====================================================

  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }

}
