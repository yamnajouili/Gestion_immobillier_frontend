import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { AboutComponent } from '../../../components/about/about.component';
import { FeaturesComponent } from '../../../components/features/features.component';
import { PropertiesTwoComponent } from '../../../components/properties-two/properties-two.component';
import { ClientsComponent } from '../../../components/clients/clients.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';
import { CategoriesComponent } from '../../../components/categories/categories.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-five',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    NavbarComponent,
    AboutComponent,
    FeaturesComponent,
    PropertiesTwoComponent,
    ClientsComponent,
    FooterComponent,
    GetInTouchComponent,
    CategoriesComponent
  ],
  templateUrl: './index-five.component.html',
  styleUrl: './index-five.component.scss'
})
export class IndexFiveComponent {
  isOpen:boolean = false
}
