import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import PropertyData from '../../../data/property.json'
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';
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
  selector: 'app-agent-profile',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './agent-profile.component.html',
  styleUrl: './agent-profile.component.scss'
})
export class AgentProfileComponent {
  propertylist:Property[] = PropertyData
}
