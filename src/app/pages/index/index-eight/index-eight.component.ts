import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CategoriesTwoComponent } from '../../../components/categories-two/categories-two.component';
import { PropertiesComponent } from '../../../components/properties/properties.component';
import { CountUpModule } from 'ngx-countup';
import { ClientsComponent } from '../../../components/clients/clients.component';
import { TeamComponent } from '../../../components/team/team.component';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-eight',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NavbarComponent,
    CategoriesTwoComponent,
    PropertiesComponent,
    CountUpModule,
    ClientsComponent,
    TeamComponent,
    GetInTouchComponent,
    FooterComponent
  ],
  templateUrl: './index-eight.component.html',
  styleUrl: './index-eight.component.scss'
})
export class IndexEightComponent {
  about =[
    {
      image:'assets/images/rent.png',
      title:'Rent a House',
      desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
    },
    {
      image:'assets/images/buy.png',
      title:'Buy a House',
      desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
    },
    {
      image:'assets/images/sell.png',
      title:'Sell a House',
      desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
    },
  ]
  counterData = [
    {
      target:1548,
      name:'Properties Sell'
    },
    {
      target:25,
      name:'Award Gained'
    },
    {
      target:9,
      name:'Years Experience'
    },
]
logoImage = [
  '/assets/images/client/amazon.svg',
  '/assets/images/client/google.svg',
  '/assets/images/client/lenovo.svg',
  '/assets/images/client/paypal.svg',
  '/assets/images/client/shopify.svg',
  '/assets/images/client/spotify.svg',
]
}
