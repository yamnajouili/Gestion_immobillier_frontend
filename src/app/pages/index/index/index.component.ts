import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../../../components/about/about.component';
import { FeaturesComponent } from '../../../components/features/features.component';
import { PropertiesComponent } from '../../../components/properties/properties.component';
import { ClientsComponent } from '../../../components/clients/clients.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { SwitcherComponent } from '../../../components/switcher/switcher.component';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    NavbarComponent,
    NgSelectModule,
    FormsModule,
    YouTubePlayerModule,
    CommonModule,
    AboutComponent,
    FeaturesComponent,
    PropertiesComponent,
    ClientsComponent,
    GetInTouchComponent,
    FooterComponent,
    SwitcherComponent

  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  value: number = 5;


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

  activeindex:number = 1

  formTab(index:number) {
   this.activeindex = index
  }

}
