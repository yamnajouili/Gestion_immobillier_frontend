import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {

  featureData = [
    {
      icon: 'uil uil-search',
      title: 'Rechercher un bien',
      desc: 'Explorez les biens immobiliers disponibles selon vos critères comme le prix, la ville, le type et la surface.'
    },
    {
      icon: 'uil uil-user-check',
      title: 'Définir vos préférences',
      desc: 'Indiquez vos préférences afin de permettre au système de mieux comprendre vos besoins immobiliers.'
    },
    {
      icon: 'uil uil-estate',
      title: 'Recevoir des recommandations',
      desc: 'Consultez des biens immobiliers proposés automatiquement selon votre profil et vos préférences.'
    }
  ];
}
