import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ContratService} from '../../service/contrat.service';
import {Contrat} from '../../Models/contrat';
interface ContratDetail {
  id: number;
  titre: string;
  dateDebut: string;
  dateFin: string;
  montantLoyer: number;
  caution: number;
  statut: string;
  tokenSignature: string;
  bien: {
    titre: string;
    adresse: string;
    ville: string;
    surface: number;
    type: string;
  };
}
@Component({
  selector: 'app-signecontrat',
  imports: [CommonModule],
  templateUrl: './signecontrat.component.html',
  styleUrl: './signecontrat.component.scss'
})
export class SignecontratComponent implements OnInit{
  contrat: Contrat=new Contrat();
  id: string = '';
  loading = true;
  signing = false;
  signed = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private contratService: ContratService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadContrat();
  }

  // 🔥 CORRIGÉ
  loadContrat(): void {
    this.contratService.getByToken(this.id).subscribe({
      next: (data) => {
        console.log("TOKEN =", this.id);
        this.contrat = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Lien invalide ou expiré.';
        this.loading = false;
      }
    });
  }

  // 🔥 CORRIGÉ
  signerContrat(): void {
    this.signing = true;

    this.contratService.signer(this.id).subscribe({
      next: () => {
        this.signing = false;
        this.signed = true;
      },
      error: (err) => {
        console.error(err);
        this.signing = false;
        this.error = 'Erreur lors de la signature.';
      }
    });
  }
}
