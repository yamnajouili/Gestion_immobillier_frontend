// import { CommonModule } from '@angular/common';
// import { Component, Input } from '@angular/core';
// import PropertyData from '../../data/property.json'
// import {Router, RouterLink} from '@angular/router';
// import {User} from '../../Models/user';
// import {BienService} from '../../service/bien.service';
// import {UserService} from '../../service/user.service';
// import {Bien} from '../../Models/bien';
//
// @Component({
//   selector: 'app-properties',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterLink
//   ],
//   templateUrl: './properties.component.html',
//   styleUrl: './properties.component.scss'
// })
// export class PropertiesComponent {
//   propertylist:Bien[]=[]
//
//   // propertylist:Property[] = PropertyData.slice(0,6)
//
//   @Input() moreOption? :boolean
//   private item: any;
//   constructor(private bienService: BienService,private userService:UserService,private router :Router) {
//   }
//
//
//   user: User = new User();
//
//   ngOnInit(): void {
//     this.getUserConnecte();
//     this.loadProperties();
//   }
//
//   getUserConnecte(): void {
//     this.userService.getUserConnecte().subscribe({
//       next: (user: User) => {
//         this.user = user;
//       },
//       error: (error) => {
//         console.error('Erreur utilisateur connecté', error);
//       }
//     });
//   }
//   // contacterProprietaire(item:Bien): void {
//   //   const senderId = this.user.id;
//   //   const recipientId = item.proprietaire.id;
//   //   this.router.navigate(['/chat'], {
//   //     queryParams: {
//   //       recipientId: recipientId
//   //     }
//   //   });
//   // }
//
//   contacterProprietaire(item: Bien): void {
//     if (!item.proprietaire?.id) {          // ✅ le ?. protège
//       console.warn('Pas de propriétaire pour ce bien', item);
//       return;
//     }
//     this.router.navigate(['/chat'], {
//       queryParams: { recipientId: item.proprietaire.id }   // ✅ .id
//     });
//   }
//
//   loadProperties(): void {
//     this.bienService.getBiens().subscribe({
//       next: (res: Bien[]) => {
//         this.propertylist = res;
//         console.log("tous les bien ***********************",res)
//       },
//       error: (err) => {
//         console.error(err);
//       }
//     });
//   }
//
// }
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import PropertyData from '../../data/property.json';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../Models/user';
import { BienService } from '../../service/bien.service';
import { UserService } from '../../service/user.service';
import { Bien } from '../../Models/bien';
import {FavorisService} from '../../service/favoris.service';
import {Favoris} from '../../Models/favoris';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements OnInit {

  propertylist: Bien[] = [];

  // ===== PAGINATION =====
  propertylistPaged: Bien[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  pages: number[] = [];
  favorisIds: number[] = [];
  @Input() moreOption?: boolean;

  user: User = new User();

  constructor(
    private bienService: BienService,
    private userService: UserService,
    private router: Router,
    private favorisService:FavorisService
  ) {}

  ngOnInit(): void {
    this.getUserConnecte();
    this.loadProperties();
    const token = localStorage.getItem('token');

    if (token) {
      this.getMesFavoris();
    }
  }



  getMesFavoris(): void {
    this.favorisService.getMesFavoris().subscribe({
      next: (data) => {
        this.favorisIds = data.map(fav => fav.bienId);

        console.log('Favoris sur index :', this.favorisIds);
      },
      error: (error) => {
        console.error('Erreur récupération favoris :', error);
        this.favorisIds = [];
      }
    });
  }




  toggleFavori(item: any, event: Event): void {

    event.stopPropagation();

    const token = localStorage.getItem('token');

    // Utilisateur non connecté
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // Seul CLIENT peut ajouter aux favoris
    if (this.user?.role !== 'CLIENT') {
      return;
    }

    // Déjà favori
    if (this.isFavori(item.id)) {
      console.log('Ce bien est déjà dans les favoris');
      return;
    }

    const favoris = new Favoris();

    favoris.bienId = item.id;

    this.favorisService.ajouterFavoris(favoris).subscribe({

      next: (response) => {

        console.log(
          'Favori ajouté avec succès :',
          response
        );

        // Le coeur devient rouge immédiatement
        this.favorisIds.push(item.id);
      },

      error: (error) => {

        console.error(
          'Erreur ajout favori :',
          error
        );

      }

    });
  }

  isFavori(bienId: number): boolean {
    return this.favorisIds.includes(bienId);
  }


  // ===== CHARGEMENT DES BIENS =====
  loadProperties(): void {
    this.bienService.getBiens().subscribe({
      next: (res: Bien[]) => {
        this.propertylist = res;
        console.log('tous les biens ***********************', res);
        this.updatePagination();          // 👈 AJOUT
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // ===== PAGINATION =====
  updatePagination(): void {
    this.totalPages = Math.ceil(this.propertylist.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.goToPage(1);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * this.itemsPerPage;
    this.propertylistPaged = this.propertylist.slice(start, start + this.itemsPerPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  // ===== UTILISATEUR =====
  getUserConnecte(): void {
    this.userService.getUserConnecte().subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Erreur utilisateur connecté', error);
      }
    });
  }

  // ===== CONTACTER PROPRIÉTAIRE =====
  contacterProprietaire(item: Bien): void {
    if (!item.proprietaire?.id) {
      console.warn('Pas de propriétaire pour ce bien', item);
      return;
    }
    this.router.navigate(['/chat'], {
      queryParams: { recipientId: item.proprietaire.id }
    });
  }

}
