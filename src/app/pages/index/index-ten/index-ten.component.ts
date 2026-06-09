import { Component } from '@angular/core';
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { tns } from 'tiny-slider';
import { CommonModule } from '@angular/common';
import { AboutComponent } from "../../../components/about/about.component";
import { CategoriesComponent } from "../../../components/categories/categories.component";
import { PropertiesComponent } from "../../../components/properties/properties.component";
import { ClientTwoComponent } from "../../../components/client-two/client-two.component";
import { TeamComponent } from "../../../components/team/team.component";
import { GetInTouchComponent } from "../../../components/get-in-tuch/get-in-touch.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import BlogData from '../../../data/blog.json'

@Component({
  selector: 'app-index-ten',
  imports: [
    CommonModule,
    NavbarComponent,
    RouterLink,
    AboutComponent,
    CategoriesComponent,
    PropertiesComponent,
    ClientTwoComponent,
    TeamComponent,
    GetInTouchComponent,
    FooterComponent
],
  templateUrl: './index-ten.component.html',
  styleUrl: './index-ten.component.scss'
})

export class IndexTenComponent {

  blogData = BlogData

  slider: any;

  ngAfterViewInit() {
    const sliderContainer = document.querySelector('.tiny-single');
    if (sliderContainer) {
      this.slider = tns({
        container: '.tiny-single',
        items: 1,
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        nav: false,
        speed: 800,
        gutter: 0,
      });
    }
  }

  bannerImg = [
    '/assets/images/property/1.jpg',
    '/assets/images/property/5.jpg',
    '/assets/images/property/10.jpg',
  ]

  clientImg = [
    '/assets/images/client/01.jpg',
    '/assets/images/client/02.jpg',
    '/assets/images/client/03.jpg',
    '/assets/images/client/04.jpg',
    '/assets/images/client/05.jpg',
  ]

  logoImage = [
    '/assets/images/client/amazon.svg',
    '/assets/images/client/google.svg',
    '/assets/images/client/lenovo.svg',
    '/assets/images/client/paypal.svg',
    '/assets/images/client/shopify.svg',
    '/assets/images/client/spotify.svg',
  ]

  about = [
    {
      image:'assets/images/rent.png',
      title:'Rent a House',
      desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
    },
    {
      image:'assets/images/buy.png',
      title:'Buy a House',
      desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
    },
    {
      image:'assets/images/sell.png',
      title:'Sell a House',
      desc:"If the distribution of letters and 'words' is random, the reader will not be distracted from making."
    },
  ]
}
