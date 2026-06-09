import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import PropertyData from '../../data/property.json';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { UserService } from '../../service/user.service';
import {VisiteService} from '../../service/visite.service';
import {Visite} from '../../Models/visite';
import {StatutVisite} from '../../Enum/statut-visite';
import {FavorisService} from "../../service/favoris.service";
import {Favoris} from "../../Models/favoris";

interface Property {
  id: number;
  image: string;
  name: string;
  sqf: string;
  beds: string;
  baths: string;
  price: string;
}

interface Client {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  photo?: string;
  visites?: any[];
  favoris?: any[];
  contrats?: any[];
  recommandations?: any[];
  preference?: any;
}

@Component({
  selector: 'app-dhashboard-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NavbarComponent],
  templateUrl: './dhashboard-user.component.html',
  styleUrl: './dhashboard-user.component.scss'
})
export class DhashboardUserComponent implements OnInit {
  activeTab: string = 'overview';
  userr:any={};
  // @ts-ignore
  visite:Visite=new Visite();
  user: Client = {
    id: 0,
    nom: '',
    email: '',
    telephone: '',
    adresse: '',
    photo: '/assets/images/avatar/01.jpg',
    visites: [],
    favoris: [],
    contrats: [],
    recommandations: [],
    preference: null
  };



  constructor(private userservice: UserService,private visiteService:VisiteService,private favorisService:FavorisService) { }





  favorites: Set<number> = new Set();
  // 🔥 TOGGLE ADD / DELETE
  toggleFavorite(propertyId: number, event: Event) {
    event.stopPropagation();

    if (this.isFavorite(propertyId)) {
      // ❌ REMOVE FAVORITE
      this.favorites.delete(propertyId);

      this.favorisService.supprimerFavorisParBienId(propertyId).subscribe({
        next: () => {
          console.log('✅ Favoris supprimé');
        },
        error: (error) => {
          console.error('❌ Erreur suppression:', error);
          this.favorites.add(propertyId);
        }
      });
    } else {
      // ❤️ ADD FAVORITE
      this.favorites.add(propertyId);

      // 🔥 Créer un objet Favoris
      const favoris = new Favoris(0, new Date(), propertyId);

      this.favorisService.ajouterFavoris(favoris).subscribe({
        next: () => {
          console.log('✅ Favoris ajouté');
        },
        error: (error) => {
          console.error('❌ Erreur ajout:', error);
          this.favorites.delete(propertyId);
        }
      });
    }
  }

  isFavorite(propertyId: number): boolean {
    return this.favorites.has(propertyId);
  }


  // 🔥 toggle add / delete
  // toggleFavorite(propertyId: number, event: Event) {
  //   event.stopPropagation();
  //
  //   if (this.isFavorite(propertyId)) {
  //
  //     // ❌ REMOVE FAVORITE
  //     this.favorites.delete(propertyId);
  //
  //     this.favorisService.SupprimerFavoris(propertyId).subscribe();
  //
  //   } else {
  //
  //     // ❤️ ADD FAVORITE
  //     this.favorites.add(propertyId);
  //
  //     const favoris = new Favoris(new Date(), propertyId);
  //
  //     this.favorisService.ajouterFavoris(favoris).subscribe();
  //   }
  // }
  //
  // isFavorite(propertyId: number): boolean {
  //   return this.favorites.has(propertyId);
  // }






  // Ajoutez cette méthode
  openVisitModalDefault() {
    if (this.recentProperties && this.recentProperties.length > 0) {
      this.openVisitModal(this.recentProperties[0]);
    } else {
      alert('Aucune propriété disponible pour le moment');
    }
  }


  // Statistiques basées sur les données du client
  stats = [
    { icon: 'uil uil-calendar-alt', label: 'Visites planifiées', value: '0', change: '+0', color: 'bg-blue-600' },
    { icon: 'uil uil-heart', label: 'Propriétés favorites', value: '0', change: '+0', color: 'bg-red-600' },
    { icon: 'uil uil-file-contract', label: 'Contrats actifs', value: '0', change: '+0', color: 'bg-green-600' },
    { icon: 'uil uil-star', label: 'Recommandations', value: '0', change: '+0', color: 'bg-purple-600' }
  ];

  // Propriétés récentes (à remplacer par données API)
  recentProperties = [
    {
      id: 2,
      title: 'Villa Moderne avec Piscine',
      location: 'Cocody, Abidjan',
      price: '250,000 FCFA',
      type: 'À vendre',
      status: 'active',
      image: '/assets/images/property/1.jpg'
    },
    {
      id: 3,
      title: 'Appartement Vue Mer',
      location: 'Bietry, Abidjan',
      price: '150,000 FCFA',
      type: 'À louer',
      status: 'pending',
      image: '/assets/images/property/2.jpg'
    },
    {
      id: 4,
      title: 'Bureau Espace Coworking',
      location: 'Plateau, Abidjan',
      price: '500,000 FCFA',
      type: 'À vendre',
      status: 'active',
      image: '/assets/images/property/3.jpg'
    },
    {
      id: 5,
      title: 'Studio Meublé',
      location: 'Marcory, Abidjan',
      price: '80,000 FCFA',
      type: 'À louer',
      status: 'pending',
      image: '/assets/images/property/4.jpg'
    }
  ];

  // Activités récentes dynamiques
  recentActivities: any[] = [];

  // Messages (à remplacer par données API)
  messages = [
    { id: 1, name: 'Marie Koné', avatar: '/assets/images/avatar/02.jpg', message: 'Je suis intéressée par la villa, est-elle toujours disponible ?', time: '10:30', unread: true },
    { id: 2, name: 'Kouadio Jean', avatar: '/assets/images/avatar/03.jpg', message: 'Est-ce que le prix est négociable ?', time: '09:15', unread: true },
    { id: 3, name: 'Aminata Touré', avatar: '/assets/images/avatar/04.jpg', message: 'Merci pour les informations, je reviens vers vous.', time: 'Hier', unread: false },
    { id: 4, name: 'Bernard Konan', avatar: '/assets/images/avatar/05.jpg', message: 'Pouvez-vous me donner plus de détails ?', time: 'Hier', unread: false }
  ];

  propertylist: Property[] = PropertyData.slice(0, 6);


  ngOnInit(): void {
    this.getUserConnecte();
  }
    favoris:Favoris=new Favoris();




  getUserConnecte() {
    this.userservice.getUserConnecte().subscribe(
      value => {
        this.userr = value;

        console.log("récupération de utilisateur connecté avec succes******************** : " + JSON.stringify(value));
      },
      error => {
        console.error('Erreur lors de la récupération de utilisateur connecté', error);
      }
    );
  }

  // Met à jour les statistiques en fonction des données du client
  updateStatsFromClientData(): void {
    const visitesCount = this.user.visites?.length || 0;
    const favorisCount = this.user.favoris?.length || 0;
    const contratsCount = this.user.contrats?.filter(c => c.status === 'ACTIF' || c.status === 'active').length || 0;
    const recommandationsCount = this.user.recommandations?.length || 0;

    this.stats = [
      { icon: 'uil uil-calendar-alt', label: 'Visites planifiées', value: visitesCount.toString(), change: '+0', color: 'bg-blue-600' },
      { icon: 'uil uil-heart', label: 'Propriétés favorites', value: favorisCount.toString(), change: '+0', color: 'bg-red-600' },
      { icon: 'uil uil-file-contract', label: 'Contrats actifs', value: contratsCount.toString(), change: '+0', color: 'bg-green-600' },
      { icon: 'uil uil-star', label: 'Recommandations', value: recommandationsCount.toString(), change: '+0', color: 'bg-purple-600' }
    ];
  }

  // Génère les activités à partir des données du client
  generateActivitiesFromClientData(): void {
    const activities: any[] = [];

    // Ajouter les visites comme activités
    if (this.user.visites && this.user.visites.length > 0) {
      this.user.visites.forEach(visite => {
        activities.push({
          icon: 'uil uil-calendar-alt',
          action: 'Visite planifiée',
          property: visite.propertyName || 'une propriété',
          time: this.formatDate(visite.dateVisite),
          color: 'bg-blue-100 text-blue-600'
        });
      });
    }

    // Ajouter les contrats récents
    if (this.user.contrats && this.user.contrats.length > 0) {
      this.user.contrats.slice(0, 2).forEach(contrat => {
        activities.push({
          icon: 'uil uil-file-contract',
          action: 'Contrat signé',
          property: contrat.propertyName || 'une propriété',
          time: this.formatDate(contrat.dateCreation),
          color: 'bg-green-100 text-green-600'
        });
      });
    }

    // Ajouter les recommandations
    if (this.user.recommandations && this.user.recommandations.length > 0) {
      this.user.recommandations.forEach(recommandation => {
        activities.push({
          icon: 'uil uil-star',
          action: 'Recommandation reçue',
          property: recommandation.propertyName || 'une propriété',
          time: this.formatDate(recommandation.date),
          color: 'bg-purple-100 text-purple-600'
        });
      });
    }

    // Si pas d'activités, ajouter un message par défaut
    if (activities.length === 0) {
      activities.push({
        icon: 'uil uil-info-circle',
        action: 'Bienvenue',
        property: 'Explorez nos propriétés',
        time: 'Maintenant',
        color: 'bg-gray-100 text-gray-600'
      });
    }

    this.recentActivities = activities.slice(0, 5);
  }

  // Formate la date pour l'affichage
  formatDate(date: any): string {
    if (!date) return 'Récemment';

    const inputDate = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - inputDate.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} minutes`;
    if (diffHours < 24) return `Il y a ${diffHours} heures`;
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    return inputDate.toLocaleDateString();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Méthodes utilitaires
  getStatusClass(status: string): string {
    return status === 'active'
      ? 'bg-green-100 text-green-600'
      : 'bg-yellow-100 text-yellow-600';
  }

  getStatusText(status: string): string {
    return status === 'active' ? 'Actif' : 'En attente';
  }

  // Getters pour les propriétés de l'utilisateur
  get userNom(): string {
    return this.user.nom || 'Client';
  }

  get userEmail(): string {
    return this.user.email || 'email@exemple.com';
  }

  get userTelephone(): string {
    return this.user.telephone || '+225 XX XX XX XX';
  }

  get userAdresse(): string {
    return this.user.adresse || 'Abidjan, Côte d\'Ivoire';
  }

  get userAvatar(): string {
    return this.user.photo || '/assets/images/avatar/01.jpg';
  }
  // ========== AJOUTER POUR LE MODAL DE DEMANDE DE VISITE ==========

  showVisitModal: boolean = false;
  selectedPropertyForVisit: any = null;
  currentStep: number = 0;
  steps: string[] = ['Informations', 'Propriété', 'Planning', 'Confirmation'];
  minDate: string = '';

  // Formulaire simple sans FormBuilder
  visitFormData = {
    nom: '',
    email: '',
    telephone: '',
    propertyId: '',
    propertyTitle: '',
    dateProposee: '',
    heureProposee: '',
    commentaire: '',
    acceptTerms: false
  };

  // Ouvrir le modal
  openVisitModal(property: any) {
    this.selectedPropertyForVisit = property;
    this.showVisitModal = true;
    this.currentStep = 0;
    document.body.style.overflow = 'hidden';

    // Pré-remplir avec les infos du client
    this.visitFormData.nom = this.userNom;
    this.visitFormData.email = this.userEmail;
    this.visitFormData.telephone = this.userTelephone;
    this.visitFormData.propertyId = property.id;
    this.visitFormData.propertyTitle = property.title;

    // Date minimale = aujourd'hui
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  // Fermer le modal
  closeVisitModal() {
    this.showVisitModal = false;
    this.selectedPropertyForVisit = null;
    this.currentStep = 0;
    document.body.style.overflow = 'auto';

    // Réinitialiser le formulaire
    this.visitFormData = {
      nom: this.userNom,
      email: this.userEmail,
      telephone: this.userTelephone,
      propertyId: '',
      propertyTitle: '',
      dateProposee: '',
      heureProposee: '',
      commentaire: '',
      acceptTerms: false
    };
  }

  // Passer à l'étape suivante
  nextStep() {
    if (this.currentStep === 0) {
      if (this.visitFormData.nom && this.visitFormData.email && this.visitFormData.telephone) {
        this.currentStep++;
      } else {
        alert('Veuillez remplir tous les champs obligatoires');
      }
    } else if (this.currentStep === 1) {
      if (this.selectedPropertyForVisit) {
        this.currentStep++;
      }
    } else if (this.currentStep === 2) {
      if (this.visitFormData.dateProposee && this.visitFormData.heureProposee) {
        this.currentStep++;
      } else {
        alert('Veuillez sélectionner une date et une heure');
      }
    }
  }

  // Revenir à l'étape précédente
  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Obtenir la classe CSS pour l'étape
  getStepClass(stepIndex: number): string {
    if (stepIndex < this.currentStep) {
      return 'bg-green-600 text-white';
    } else if (stepIndex === this.currentStep) {
      return 'bg-green-600 text-white ring-4 ring-green-200 dark:ring-green-900';
    } else {
      return 'bg-gray-200 text-gray-500 dark:bg-gray-700';
    }
  }

  // Soumettre la demande
  submitVisitRequest() {

    // ✅ validations
    if (!this.visitFormData.acceptTerms) {
      alert('Veuillez accepter les conditions');
      return;
    }

    if (!this.visitFormData.dateProposee || !this.visitFormData.heureProposee) {
      alert('Veuillez sélectionner une date et une heure');
      return;
    }

    if (!this.selectedPropertyForVisit) {
      alert('Aucune propriété sélectionnée');
      return;
    }

    const clientId = this.userr?.id;
    if (!clientId) {
      alert('Veuillez vous connecter');
      return;
    }

    // ✅ construire date
    const dateTime = new Date(
      `${this.visitFormData.dateProposee}T${this.visitFormData.heureProposee}:00`
    );

    // ⚠️ IMPORTANT : respecter l’ordre du constructor
    const visite = new Visite(
      0, // id (backend va générer)
      dateTime, // dateProposee
      new Date(), // dateConfirme (ou null si backend accepte)
      StatutVisite.EN_ATTENTE, // statut
      this.visitFormData.commentaire || '', // commentaire
      Number(this.selectedPropertyForVisit.id), // bienId
      Number(clientId) // clientId
    );

    console.log('📤 Envoi:', visite);

    this.visiteService.createVisite(visite).subscribe({
      next: (res) => {
        console.log('✅ Succès:', res);
        alert('Demande envoyée avec succès !');
        this.closeVisitModal();
      },
      error: (err) => {
        console.error('❌ Erreur:', err);
        alert(err.error?.message || 'Erreur serveur');
      }
    });
  }

}
