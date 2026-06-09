import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ClientsComponent } from '../../components/clients/clients.component';
import { GetInTouchComponent } from '../../components/get-in-tuch/get-in-touch.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    ClientsComponent, 
    GetInTouchComponent, 
    FooterComponent
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
    featureData = [
      {
        icon:'mdi mdi-cards-heart',
        title:'Comfortable',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'mdi mdi-shield-sun',
        title:'Extra Security',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'mdi mdi-star',
        title:'Luxury',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'mdi mdi-currency-usd',
        title:'Best Price',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'mdi mdi-map-marker',
        title:'Stratagic Location',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'mdi mdi-chart-arc',
        title:'Efficient',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
    ]
}
