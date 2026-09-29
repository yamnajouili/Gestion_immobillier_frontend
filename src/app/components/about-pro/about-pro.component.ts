import { Component } from '@angular/core';
import {CountUpModule} from 'ngx-countup';
import {CommonModule} from '@angular/common';
import {BienService} from '../../service/bien.service';
import {ContratService} from '../../service/contrat.service';
import {UserService} from '../../service/user.service';
import {ChatService} from '../../service/chat.service';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-about-pro',
  imports: [CommonModule, CountUpModule,RouterLink,],
  templateUrl: './about-pro.component.html',
  styleUrl: './about-pro.component.scss'
})
export class AboutProComponent {
  totalBiens = 0;
  biensDisponibles = 0;
  totalContrats: number = 0;
  totalMessages: number = 0;
  biensRecents: any[] = [];
  contratsRecents: any[] = [];
  messagesRecents: any[] = [];

  constructor(private bienService:BienService,private contratService:ContratService ,private userservice:UserService,private chatservice:ChatService) {
  }


  ngOnInit(): void {
    this.getBiensDashboard();
    this.getContratsDashboard();
    this.getMessagesDashboard();

  }
  getMessagesDashboard(): void {

    this.userservice.getUserConnecte().subscribe({

      next: (user) => {

        this.chatservice.getContacts(user.id).subscribe({

          next: (contacts) => {

            this.totalMessages = contacts.length;

            this.messagesRecents = contacts.slice(0, 3);

            console.log(
              'Conversations propriétaire :',
              contacts
            );
          },

          error: (err) => {

            console.error(
              'Erreur récupération conversations :',
              err
            );

            this.totalMessages = 0;
            this.messagesRecents = [];
          }

        });
      },

      error: (err) => {

        console.error(
          'Erreur utilisateur connecté :',
          err
        );

        this.totalMessages = 0;
        this.messagesRecents = [];
      }

    });
  }
  getContratsDashboard(): void {

    this.contratService
      .getMesContratsProprietaire()
      .subscribe({

        next: (data) => {

          // Nombre total de contrats
          this.totalContrats = data.length;

          // 3 derniers contrats
          this.contratsRecents = [...data]
            .sort((a, b) => b.id - a.id)
            .slice(0, 3);

          console.log(
            'Contrats propriétaire :',
            data
          );
        },

        error: (err) => {

          console.error(
            'Erreur récupération contrats :',
            err
          );

          this.totalContrats = 0;
          this.contratsRecents = [];
        }

      });
  }
  getBiensDashboard(): void {

    this.bienService.getMyBiens().subscribe({

      next: (data) => {

        // Total des biens du propriétaire
        this.totalBiens = data.length;

        // Biens disponibles
        this.biensDisponibles = data.filter(
          bien => bien.disponible === true
        ).length;

        // 3 derniers biens ajoutés
        this.biensRecents = [...data]
          .sort((a, b) => b.id - a.id)
          .slice(0, 3);

        console.log('Biens propriétaire :', data);
      },

      error: (err) => {

        console.error(
          'Erreur récupération des biens :',
          err
        );

        this.totalBiens = 0;
        this.biensDisponibles = 0;
        this.biensRecents = [];
      }

    });
  }
}
