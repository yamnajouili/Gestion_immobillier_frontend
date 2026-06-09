import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import * as feather from 'feather-icons';
import { FormsModule } from '@angular/forms';
import {Client} from '../../../Models/client';
import {ClientService} from '../../../service/client.service';
import {PropriétaireService} from '../../../service/propriétaire.service';
import {Propriétaire} from '../../../Models/propriétaire';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './auth-signup.component.html',
  styleUrl: './auth-signup.component.scss',
  styles: [`
    ::ng-deep {

        input, select {
          padding-left: 30px !important;

        }
      }

  `]
})
export class AuthSignupComponent implements OnInit, AfterViewInit {

  showQuestion: boolean = true;
  showClientForm: boolean = false;
  showProprietaireForm: boolean = false;
  submitted: boolean = false;
  client: Client = new Client();
proprietaire: Propriétaire = new Propriétaire();
  // Données formulaire Propriétaire
  proprietaireData = {
    nom: '',
    telephone: '',
    poste: '',
    email: '',
    password: '',
    confirmPassword: '',
    typeProprietaire: '',
    nomAgence: '',
    adresseProfessionnelle: '',
    numeroSiret: '',
    acceptTerms: false
  };

  constructor(private clientservice: ClientService,private router:Router,private proprietaireservice:PropriétaireService) {
  }









  register(): void {
    // Appel au service avec les données + rôle CLIENT
    this.clientservice.register(this.client).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.router.navigate(['/success-client']);
      },
      error: (error) => {
        console.error('Erreur', error);
        alert('❌ Erreur lors de l\'inscription');
      }
    });
  }



  registerProprietaires(): void {
    // Appel au service avec les données + rôle proprietaire
    this.proprietaireservice.register(this.proprietaire).subscribe({
      next: (response) => {
        console.log('Inscription réussie', response);
        this.router.navigate(['/success']);
      },
      error: (error) => {
        console.error('Erreur', error);
        alert('❌ Erreur lors de l\'inscription');
      }
    });
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    feather.replace();
  }

  // Afficher formulaire Client
  showClientFormMethod(): void {
    this.showQuestion = false;
    this.showClientForm = true;
    this.showProprietaireForm = false;
    this.submitted = false;
  }

  // Afficher formulaire Propriétaire
  showProprietaireFormMethod(): void {
    this.showQuestion = false;
    this.showClientForm = false;
    this.showProprietaireForm = true;
    this.submitted = false;
  }

  // Retour à la question
  backToQuestion(): void {
    this.showQuestion = true;
    this.showClientForm = false;
    this.showProprietaireForm = false;
    this.submitted = false;
  }

  // Vérification des mots de passe Client
  isPasswordMatchClient(): boolean {
    return this.client.password === this.client.confirmPassword;
  }

  // Vérification des mots de passe Propriétaire
  isPasswordMatchProprietaire(): boolean {
    return this.proprietaireData.password === this.proprietaireData.confirmPassword;
  }


}
