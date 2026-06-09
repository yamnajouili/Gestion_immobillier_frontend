import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { NgSelectModule } from '@ng-select/ng-select';
import { PropertiesTwoComponent } from '../../../components/properties-two/properties-two.component';
import { CategoriesComponent } from '../../../components/categories/categories.component';
import { ClientsComponent } from '../../../components/clients/clients.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-six',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    NavbarComponent, 
    NgxTypedJsModule, 
    NgSelectModule,
    PropertiesTwoComponent, 
    CategoriesComponent, 
    ClientsComponent,
    FooterComponent
  ],
  templateUrl: './index-six.component.html',
  styleUrl: './index-six.component.scss'
})
export class IndexSixComponent {

  isOpen:boolean = false
  
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
  
}
