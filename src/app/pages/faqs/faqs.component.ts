import { CommonModule } from '@angular/common';
import {  Component, } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    RouterLink,

  ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent {

  activeIndex: number | null = null;
  activeIndex2: number | null = null;
  activeIndex3: number | null = null;
  activeIndex4: number | null = null;

  generalFaq = [
    {
      id: 1,
      title: 'Comment fonctionne la plateforme ?',
      desc: 'La plateforme permet de consulter des biens immobiliers, de rechercher selon différents critères et de recevoir des suggestions adaptées aux préférences de l’utilisateur.'
    },
    {
      id: 2,
      title: 'Dois-je créer un compte pour utiliser la plateforme ?',
      desc: 'La création d’un compte est nécessaire pour accéder aux fonctionnalités personnalisées et à la gestion des annonces.'
    },
    {
      id: 3,
      title: 'À qui s’adresse cette plateforme ?',
      desc: 'La plateforme est destinée aux utilisateurs à la recherche de biens immobiliers, aux propriétaires souhaitant publier des annonces ainsi qu’à l’administrateur chargé de la gestion globale.'
    },
    {
      id: 4,
      title: 'Puis-je accéder à la plateforme depuis mon téléphone ?',
      desc: 'Oui, la plateforme dispose d’une interface responsive permettant une utilisation sur ordinateur, tablette et mobile.'
    }
  ];

  searchFaq = [
    {
      id: 1,
      title: 'Comment les recommandations sont-elles proposées ?',
      desc: 'Les recommandations sont générées à partir des préférences enregistrées par l’utilisateur afin de lui proposer des biens adaptés.'
    },
    {
      id: 2,
      title: 'Puis-je rechercher un bien selon plusieurs critères ?',
      desc: 'Oui, il est possible de filtrer les biens selon plusieurs critères comme le prix, la localisation, le type de bien ou la surface.'
    },
    {
      id: 3,
      title: 'Les recommandations sont-elles personnalisées ?',
      desc: 'Oui, le système propose des biens immobiliers correspondant aux préférences définies par l’utilisateur.'
    },
    {
      id: 4,
      title: 'Puis-je consulter les détails d’un bien ?',
      desc: 'Oui, chaque annonce contient des informations détaillées comme le prix, la localisation, la description et les caractéristiques du bien.'
    }
  ];

  accountFaq = [
    {
      id: 1,
      title: 'Comment publier une annonce ?',
      desc: 'Le propriétaire peut ajouter une annonce en renseignant les informations du bien immobilier via son espace personnel.'
    },
    {
      id: 2,
      title: 'Puis-je modifier ou supprimer une annonce ?',
      desc: 'Oui, le propriétaire peut gérer ses annonces à tout moment depuis son tableau de bord.'
    },
    {
      id: 3,
      title: 'Puis-je enregistrer mes préférences ?',
      desc: 'Oui, l’utilisateur peut définir ses préférences afin d’obtenir des suggestions plus pertinentes.'
    },
    {
      id: 4,
      title: 'Comment gérer mon compte ?',
      desc: 'Chaque utilisateur dispose d’un espace personnel lui permettant de consulter et de gérer ses informations.'
    }
  ];

  supportFaq = [
    {
      id: 1,
      title: 'Comment contacter l’assistance ?',
      desc: 'Vous pouvez utiliser la page de contact pour envoyer votre demande ou poser vos questions à l’équipe de support.'
    },
    {
      id: 2,
      title: 'Que faire en cas de problème technique ?',
      desc: 'En cas de problème technique, il suffit de contacter l’assistance via le formulaire de contact disponible sur la plateforme.'
    },
    {
      id: 3,
      title: 'Puis-je signaler une annonce incorrecte ?',
      desc: 'Oui, l’administrateur peut contrôler les annonces et intervenir si nécessaire afin de garantir la qualité du contenu publié.'
    },
    {
      id: 4,
      title: 'Qui gère le bon fonctionnement de la plateforme ?',
      desc: 'L’administrateur assure la supervision des utilisateurs et des annonces afin de maintenir le bon fonctionnement du système.'
    }
  ];

  toggleBox(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  toggleBox2(index: number) {
    this.activeIndex2 = this.activeIndex2 === index ? null : index;
  }

  toggleBox3(index: number) {
    this.activeIndex3 = this.activeIndex3 === index ? null : index;
  }

  toggleBox4(index: number) {
    this.activeIndex4 = this.activeIndex4 === index ? null : index;
  }

}
