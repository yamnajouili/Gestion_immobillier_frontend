import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarFullComponent } from '../../../../components/navbar-full/navbar-full.component';
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
  selector: 'app-list-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    NavbarFullComponent,
    FooterComponent
  ],
  templateUrl: './list-sidebar.component.html',
  styleUrl: './list-sidebar.component.scss'
})
export class ListSidebarComponent {

  propertylist:Property[] = PropertyData
  
}
