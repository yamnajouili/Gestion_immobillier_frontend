import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AboutComponent } from '../../../components/about/about.component';
import { FeaturesComponent } from '../../../components/features/features.component';
import { PropertiesTwoComponent } from '../../../components/properties-two/properties-two.component';
import { CountUpModule } from 'ngx-countup';
import { ClientTwoComponent } from '../../../components/client-two/client-two.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';

@Component({
  selector: 'app-index-two',
  standalone: true,
  imports: [
    NavbarComponent, 
    CommonModule,
    NgSelectModule,
    AboutComponent, 
    FeaturesComponent, 
    PropertiesTwoComponent,
    CountUpModule, 
    GetInTouchComponent,
    ClientTwoComponent, 
    FooterComponent
  ],
  templateUrl: './index-two.component.html',
  styleUrl: './index-two.component.scss'
})
export class IndexTwoComponent {

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

  activeindex:number = 1

  formTab(index:number) {
   this.activeindex = index
  }

}
