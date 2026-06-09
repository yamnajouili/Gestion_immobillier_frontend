import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-agencies',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterLink,
    GetInTouchComponent,
    FooterComponent
  ],
  templateUrl: './agencies.component.html',
  styleUrl: './agencies.component.scss'
})
export class AgenciesComponent {
    agencyList = [
      {
        image:'assets/images/agency/1.png',
        name:'Realty Zen',
        title:'Real Estate Agency'
      },
      {
        image:'assets/images/agency/2.png',
        name:'Highrises Realty',
        title:'Real Estate Agency'
      },
      {
        image:'assets/images/agency/3.png',
        name:'Avenue Realty',
        title:'Real Estate Agency'
      },
      {
        image:'assets/images/agency/4.png',
        name:'Ambrose Properties',
        title:'Real Estate Agency'
      },
      {
        image:'assets/images/agency/5.png',
        name:'Arrow Realtors',
        title:'Real Estate Agency'
      },
      {
        image:'assets/images/agency/6.png',
        name:'Aspire Brokers',
        title:'Real Estate Agency'
      },
      {
        image:'assets/images/agency/7.png',
        name:'Beachfront Properties',
        title:'Real Estate Agency'
      },
      {
        image:'assets/images/agency/8.png',
        name:'Climb Real Estate',
        title:'Real Estate Agency'
      },
      {
        image:'assets/images/agency/9.png',
        name:'Dream Homes',
        title:'Real Estate Agency'
      },
    ]
}
