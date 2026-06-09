import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FooterComponent } from '../../../../components/footer/footer.component';

import PropertyData from '../../../../data/property.json'
import { RouterLink } from '@angular/router';

interface Property {
  id:number
  image:string
  name:string
  sqf:string
  beds:string
  baths:string
  price:string
}

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    NavbarComponent, 
    NgSelectModule,
    FooterComponent
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
    property = [
      { id: 1, name: 'Houses' },
      { id: 2, name: 'Apartment' },
      { id: 3, name: 'Offices' },
      { id: 4, name: 'Townhome' },
    ]

    minPrice = [
      {id: 1, name: '500'},
      {id: 2, name: '1000'},
      {id: 3, name: '2000'},
      {id: 4, name: '3000'},
      {id: 5, name: '4000'}
    ]

    maxPrice = [
      {id: 1, name: '500'},
      {id: 2, name: '1000'},
      {id: 3, name: '2000'},
      {id: 4, name: '3000'},
      {id: 5, name: '4000'}
    ]

    propertylist:Property[] = PropertyData
}
