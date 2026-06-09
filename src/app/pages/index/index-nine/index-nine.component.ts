import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { TaglineComponent } from '../../../components/tagline/tagline.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from '../../../components/about/about.component';
import { FeaturesComponent } from '../../../components/features/features.component';
import { CountUpModule } from 'ngx-countup';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';
import { TeamComponent } from '../../../components/team/team.component';
import { ClientsComponent } from '../../../components/clients/clients.component';
import { PropertiesThreeComponent } from "../../../components/properties-three/properties-three.component";
import { CategoriesComponent } from "../../../components/categories/categories.component";
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-index-nine',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    TaglineComponent,
    NgSelectModule,
    FormsModule,
    AboutComponent,
    FeaturesComponent,
    CountUpModule,
    GetInTouchComponent,
    TeamComponent,
    ClientsComponent,
    PropertiesThreeComponent,
    CategoriesComponent,
    FooterComponent
],
  templateUrl: './index-nine.component.html',
  styleUrl: './index-nine.component.scss'
})
export class IndexNineComponent {
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
}
