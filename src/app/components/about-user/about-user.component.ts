import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {ContratService} from '../../service/contrat.service';
import {BienService} from '../../service/bien.service';
import { Router } from '@angular/router';
import {FavorisService} from '../../service/favoris.service';
import {ChatService} from '../../service/chat.service';
import {PreferenceService} from "../../service/preference.service";  // ← AJOUTE CETTE LIGNE !


@Component({
  selector: 'app-about-user',
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './about-user.component.html',
  styleUrl: './about-user.component.scss'
})
export class AboutUserComponent {
  totalFavoris: number = 0;
  totalMessages: number = 0;
  totalContrats: number = 0;
  contratsASigner: number = 0;
  favorisRecents: any[] = [];
  contratsRecents: any[] = [];
  contratsEnAttente: any[] = [];
  recommandations: any[] = [];
  // --- Listes ---
  favoris: any[] = [];
  prochainesVisites: any[] = [];
  messagesRecents: any[] = [];
  locationsActivesList: any[] = [];
  derniersPaiements: any[] = [];
  activites: any[] = [];
  prochainEcheance: any = { bienTitre: '', montant: 0, dateLimite: '' };

  // Injection des dépendances
  constructor(
    private http: HttpClient, private userservice:UserService,private contratService:ContratService,private favorisService: FavorisService,
    private chatService:ChatService,private bienService:BienService,private  preferenceService:PreferenceService,
    private router:Router) { }

  ngOnInit(): void {
    this.getContratsDashboard();
    this.getFavorisDashboard();
    this.getMessagesDashboard();
    this.getRecommandationsDashboard();
  }
  getFavorisDashboard(): void {

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
  getContratsDashboard(): void {

    this.contratService.getMesContrats().subscribe({
      next: (data) => {

        // Nombre total de contrats
        this.totalContrats = data.length;

        // Tous les contrats en attente
        const enAttente = data.filter(
            contrat => contrat.statut === 'EN_ATTENTE'
        );

        // Card "À signer"
        this.contratsASigner = enAttente.length;

        // Maximum 3 dans la section "À signer"
        this.contratsEnAttente = enAttente.slice(0, 3);

        // 3 contrats les plus récents
        this.contratsRecents = [...data]
            .sort((a, b) => b.id - a.id)
            .slice(0, 3);

        console.log('Contrats récents :', this.contratsRecents);
        console.log('Contrats à signer :', this.contratsEnAttente);
      },

      error: (error) => {

        console.error(
            'Erreur récupération contrats dashboard :',
            error
        );

        this.totalContrats = 0;
        this.contratsASigner = 0;
        this.contratsRecents = [];
        this.contratsEnAttente = [];
      }
    });
  }
  voirBien(id: number): void {
    this.router.navigate(['/property-detail-two', id]);
  }



  getMessagesDashboard(): void {

    this.userservice.getUserConnecte().subscribe({
      next: (user) => {

        const userId = user.id;

        this.chatService.getContacts(userId).subscribe({
          next: (contacts) => {

            // Nombre de conversations
            this.totalMessages = contacts.length;

            // 3 conversations récentes
            this.messagesRecents = contacts.slice(0, 3);

            console.log('Conversations récentes :', this.messagesRecents);
          },

          error: (error) => {
            console.error('Erreur récupération conversations :', error);

            this.totalMessages = 0;
            this.messagesRecents = [];
          }
        });

      },

      error: (error) => {
        console.error('Erreur utilisateur connecté :', error);

        this.totalMessages = 0;
        this.messagesRecents = [];
      }
    });
  }

  getRecommandationsDashboard(): void {

    this.preferenceService.getRecommandations().subscribe({
      next: (data) => {

        // Maximum 3 recommandations
        const recommandationsIA = data.slice(0, 3);

        this.recommandations = [];

        recommandationsIA.forEach(rec => {

          this.bienService.getBienById(rec.bien.id).subscribe({
            next: (bien) => {

              this.recommandations.push({
                ...rec,
                bien: bien
              });

              console.log(
                  'Recommandation complète :',
                  this.recommandations
              );
            },

            error: (error) => {
              console.error(
                  'Erreur récupération bien : ' + rec.bien.id,
                  error
              );
            }
          });

        });

      },

      error: (error) => {
        console.error(
            'Erreur recommandations dashboard :',
            error
        );

        this.recommandations = [];
      }
    });
  }

}
