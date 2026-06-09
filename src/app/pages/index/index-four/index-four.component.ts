import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { AboutComponent } from '../../../components/about/about.component';
import { FeaturesComponent } from '../../../components/features/features.component';
import { PropertiesComponent } from '../../../components/properties/properties.component';
import { ClientsComponent } from '../../../components/clients/clients.component';

import { FooterComponent } from '../../../components/footer/footer.component';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-four',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NavbarComponent,
    AboutComponent,
    FeaturesComponent,
    PropertiesComponent, 
    ClientsComponent,
    GetInTouchComponent, 
    FooterComponent
  ],
  templateUrl: './index-four.component.html',
  styleUrl: './index-four.component.scss'
})
export class IndexFourComponent {
  isOpen:boolean = false
  
  activeindex:number = 1

  formTab(index:number){
    this.activeindex = index
  }
}
