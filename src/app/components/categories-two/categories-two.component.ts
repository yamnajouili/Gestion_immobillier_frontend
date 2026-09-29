import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-two',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './categories-two.component.html',
  styleUrl: './categories-two.component.scss'
})
export class CategoriesTwoComponent {
  categoriesData = [
    {
      image:'assets/images/property/residential.jpg',
      name:'Residential',
      title:'46 Listings'
    },
    {
      image:'assets/images/property/land.jpg',
      name:'Land',
      title:'124 Listings'
    },
    {
      image:'assets/images/property/commercial.jpg',
      name:'Commercial',
      title:'265 Listings'
    },
    {
      image:'assets/images/property/industrial.jpg',
      name:'Industrial',
      title:'452 Listings'
    },
    {
      image:'assets/images/property/investment.jpg',
      name:'Investment',
      title:'12 Listings'
    },
  ]
}
