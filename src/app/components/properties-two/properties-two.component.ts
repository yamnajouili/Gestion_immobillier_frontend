import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { tns } from 'tiny-slider/src/tiny-slider';

import PropertyData from '../../data/property.json'
import { RouterLink } from '@angular/router';
interface Property {
  id:number
  image:string
  name:string
  sqf:string
  beds:string
  baths:string
  price:string
}

@Component({
  selector: 'app-properties-two',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './properties-two.component.html',
  styleUrl: './properties-two.component.scss'
})
export class PropertiesTwoComponent {

  slider: any;

  ngAfterViewInit() {
    const sliderContainer = document.querySelector('.tiny-home-slide-three');
    if (sliderContainer) {
      this.slider = tns({
        container: '.tiny-home-slide-three',
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
        responsive: {
            992: {
                items: 3
            },

            767: {
                items: 2
            },

            320: {
                items: 1
            },
        },
      });
    }
  }
  propertylist:Property[] = PropertyData.slice(0,6)
}
