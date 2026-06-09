import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import PropertyData from '../../../data/property.json'
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-agency-profile',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent,
    RouterLink, 
    FooterComponent
  ],
  templateUrl: './agency-profile.component.html',
  styleUrl: './agency-profile.component.scss'
})
export class AgencyProfileComponent {
  propertylist = PropertyData
  agentData =[
    {
      image:'assets/images/client/04.jpg',
      name:'Jack John',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/05.jpg',
      name:'Krista John',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/06.jpg',
      name:'Roger Jackson',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/07.jpg',
      name:'Johnny English',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/08.jpg',
      name:'Clayton Dalke',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/01.jpg',
      name:'Christopher Myers',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/02.jpg',
      name:'Mary Petersen',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/03.jpg',
      name:'Amber Durden',
      position:'Property Broker'
    },
  ]
}
