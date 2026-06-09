import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { GetInTouchComponent } from '../../components/get-in-tuch/get-in-touch.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    NavbarComponent,
    GetInTouchComponent, 
    FooterComponent
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  pricingData = [
    {
      icon:'uil uil-trees',
      title:'Basic',
      amount:19,
      feature:['Full Access', 'Source Files', 'Free Appointments', 'Enhanced Security']
    },
    {
      icon:'uil uil-shield',
      title:'Premium',
      amount:39,
      feature:['Full Access', 'Source Files', 'Free Appointments', 'Enhanced Security']
    },
    {
      icon:'uil uil-rocket',
      title:'Business',
      amount:99,
      feature:['Full Access', 'Source Files', 'Free Appointments', 'Enhanced Security']
    },
  ]
}
