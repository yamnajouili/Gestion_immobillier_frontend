import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { tns } from 'tiny-slider/src/tiny-slider';
import { FooterComponent } from '../../../../components/footer/footer.component';

@Component({
  selector: 'app-property-detail-two',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './property-detail-two.component.html',
  styleUrl: './property-detail-two.component.scss'
})
export class PropertyDetailTwoComponent {
  slider: any;

  ngAfterViewInit() {
    const sliderContainer = document.querySelector('.tiny-one-item');
    if (sliderContainer) {
      this.slider = tns({
        container: '.tiny-one-item',
        items: 1,
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
      });
    }
  }
  images = [
    "assets/images/property/single/1.jpg","assets/images/property/single/2.jpg","assets/images/property/single/3.jpg","assets/images/property/single/4.jpg","assets/images/property/single/5.jpg"
  ]
}
