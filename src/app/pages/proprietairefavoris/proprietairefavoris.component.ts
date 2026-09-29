import { Component , OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {AboutUserComponent} from '../../components/about-user/about-user.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {RouterModule} from '@angular/router';
import {FavorisService} from '../../service/favoris.service';
import {BienService} from '../../service/bien.service';

@Component({
  selector: 'app-proprietairefavoris',
  imports: [CommonModule, FormsModule, NavbarComponent,SidebaruserComponent, TopbarComponent,AboutUserComponent,FooterAdminComponent,RouterModule                                 // ← Nécessaire pour routerLink
  ],
  templateUrl: './proprietairefavoris.component.html',
  styleUrl: './proprietairefavoris.component.scss'
})
export class ProprietairefavorisComponent implements OnInit{
  activeSidebar:boolean = true;
  totalFavoris: number = 0;
  favorisRecents: any[] = [];

  ngOnInit(): void {
    this.getMesFavoris();
  }
  constructor(private favorisService:FavorisService,private bienService:BienService) {
  }
  getMesFavoris(): void {

    this.favorisService.getMesFavoris().subscribe({
      next: (data) => {

        this.totalFavoris = data.length;

        const derniersFavoris = data
          .sort((a, b) =>
            new Date(b.dateAjout).getTime() -
            new Date(a.dateAjout).getTime()
          )
          .slice(0, 3);

        this.favorisRecents = [];

        derniersFavoris.forEach(fav => {

          this.bienService.getBienById(fav.bienId).subscribe({
            next: (bien) => {

              this.favorisRecents.push({
                ...fav,
                bien: bien
              });

              console.log('Favori complet :', this.favorisRecents);
            },

            error: (error) => {
              console.error(
                'Erreur récupération du bien ' + fav.bienId,
                error
              );
            }
          });

        });

      },

      error: (error) => {
        console.error('Erreur récupération favoris :', error);
        this.totalFavoris = 0;
        this.favorisRecents = [];
      }
    });
  }

  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }

  supprimerFavori(id: number): void {

    this.favorisService.deleteFavoris(id).subscribe({
      next: () => {

        // Retirer directement de l'affichage
        this.favorisRecents = this.favorisRecents.filter(
          fav => fav.id !== id
        );

        // Mettre à jour le compteur
        this.totalFavoris = this.favorisRecents.length;

        console.log('Favori supprimé avec succès');
      },

      error: (error) => {
        console.error(
          'Erreur lors de la suppression du favori :',
          error
        );
      }
    });
  }
}
