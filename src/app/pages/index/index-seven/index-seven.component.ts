import { CommonModule,  } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA,  ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { AboutComponent } from '../../../components/about/about.component';
import { FeaturesComponent } from '../../../components/features/features.component';
import { PropertiesThreeComponent } from '../../../components/properties-three/properties-three.component';
import { TeamComponent } from '../../../components/team/team.component';
import { ClientsComponent } from '../../../components/clients/clients.component';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountUpModule } from 'ngx-countup';

import { register } from 'swiper/element/bundle';

import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

import { Pagination, Autoplay } from 'swiper/modules'
import { RouterLink } from '@angular/router';

register();

@Component({
  selector: 'app-index-seven',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    NavbarComponent,
    AboutComponent, 
    FeaturesComponent,
    PropertiesThreeComponent,
    TeamComponent, 
    ClientsComponent,
    GetInTouchComponent, 
    FooterComponent, 
    NgSelectModule, 
    CountUpModule 
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './index-seven.component.html',
  styleUrl: './index-seven.component.scss'
})

export class IndexSevenComponent {
  constructor() {
    register()
  }
  
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
  
  activeindex:number = 1

  formTab(index:number) {
   this.activeindex = index
  }

  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;
  



  index = 0;

  swiperConfig: SwiperOptions = {
    modules:[Autoplay],
    spaceBetween: 10,
    navigation: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false, // ✅ Prevents autoplay from stopping on user interaction
    },
    loop: true,
    speed:1000,
    
  }

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false, // ✅ Prevents autoplay from stopping on user interaction
    },
  }
  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
    
  }
}
