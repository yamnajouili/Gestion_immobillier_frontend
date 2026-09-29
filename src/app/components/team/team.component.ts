import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  teamData = [
    {
      image: 'assets/images/client/01.jpg',
      name: 'Ahmed Ben Ali',
      title: 'Propriétaire immobilier'
    },
    {
      image: 'assets/images/client/02.jpg',
      name: 'Sonia Trabelsi',
      title: 'Propriétaire immobilier'
    },
    {
      image: 'assets/images/client/03.jpg',
      name: 'Karim Mansour',
      title: 'Annonceur immobilier'
    },
    {
      image: 'assets/images/client/04.jpg',
      name: 'Amira Jlassi',
      title: 'Propriétaire partenaire'
    }
  ];}
