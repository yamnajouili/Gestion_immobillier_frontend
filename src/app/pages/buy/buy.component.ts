import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PropertiesComponent } from '../../components/properties/properties.component';
import { GetInTouchComponent } from '../../components/get-in-tuch/get-in-touch.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent,
    PropertiesComponent,
    GetInTouchComponent, 
    FooterComponent
  ],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent {

  activeIndex:number = 1;

  TabClick(index:number){
    this.activeIndex = index
  }

    benefitsData = [
      {
        icon:'uil uil-estate',
        title:'Free Consultation',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'uil uil-bag',
        title:'Buyer Rebate Programs',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
      {
        icon:'uil uil-key-skeleton',
        title:'Save Money',
        desc:'If the distribution of letters and words is random, the reader will not be distracted from making.'
      },
    ]
}

