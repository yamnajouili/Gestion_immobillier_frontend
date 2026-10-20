import { Component } from '@angular/core';
import {Propositionachat} from '../../Models/propositionachat';
import {PropositionAchatService} from '../../service/proposition-achat.service';
import {UserService} from '../../service/user.service';
import {CommonModule} from '@angular/common';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-propositions-recues',
  imports: [CommonModule,SidebarComponent,
    TopbarComponent,
    FooterAdminComponent
  ],
  templateUrl: './propositions-recues.component.html',
  styleUrl: './propositions-recues.component.scss'
})
export class PropositionsRecuesComponent {
  activeSidebar = true;

  user: any = null;

  propositions: Propositionachat[] = [];

  loading = false;
  errorMessage = '';

  propositionSelectionnee: Propositionachat | null = null;
  actionSelectionnee: 'accepter' | 'refuser' | null = null;
  actionEnCours = false;
  erreurAction = '';

  constructor(
    private propositionService: PropositionAchatService,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.getUserConnecte();
  }

  toggleClass(): void {
    this.activeSidebar = !this.activeSidebar;
  }

  getUserConnecte(): void {
    this.loading = true;
    this.errorMessage = '';

    this.userservice.getUserConnecte().subscribe({
      next: (value: any) => {
        this.user = value;

        if (value.role === 'PROPRIETAIRE') {
          this.chargerPropositions();
        } else {
          this.errorMessage = 'Accès réservé aux propriétaires.';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Erreur utilisateur connecté :', error);
        this.errorMessage = 'Impossible de récupérer votre profil.';
        this.loading = false;
      }
    });
  }

  chargerPropositions(): void {
    if (!this.user || this.user.role !== 'PROPRIETAIRE') {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.propositionService.getByProprietaire().subscribe({
      next: (data: Propositionachat[]) => {
        this.propositions = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur propositions reçues :', error);
        this.errorMessage = 'Impossible de charger les propositions reçues.';
        this.loading = false;
      }
    });
  }

  compterStatut(statut: string): number {
    return this.propositions.filter(
      proposition => proposition.statut === statut
    ).length;
  }

  libelleStatut(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE':
        return 'En attente';
      case 'ACCEPTEE':
        return 'Acceptée';
      case 'REFUSEE':
        return 'Refusée';
      default:
        return 'Inconnu';
    }
  }

  ouvrirConfirmation(proposition: Propositionachat, action: 'accepter' | 'refuser'): void {
    if (proposition.statut !== 'EN_ATTENTE') {
      return;
    }

    this.propositionSelectionnee = proposition;
    this.actionSelectionnee = action;
    this.erreurAction = '';
  }

  fermerConfirmation(): void {
    if (this.actionEnCours) {
      return;
    }

    this.propositionSelectionnee = null;
    this.actionSelectionnee = null;
    this.erreurAction = '';
  }

  confirmerAction(): void {
    if (!this.propositionSelectionnee?.id ||
      !this.actionSelectionnee ||
      this.actionEnCours) {
      return;
    }

    const id = this.propositionSelectionnee.id;

    const requete = this.actionSelectionnee === 'accepter'
      ? this.propositionService.accepter(id)
      : this.propositionService.refuser(id);

    this.actionEnCours = true;
    this.erreurAction = '';

    requete.subscribe({
      next: () => {
        this.actionEnCours = false;
        this.fermerConfirmation();
        this.chargerPropositions();
      },
      error: (error) => {
        console.error('Erreur traitement proposition :', error);
        this.erreurAction = 'Impossible de traiter cette proposition.';
        this.actionEnCours = false;
      }
    });
  }

}
