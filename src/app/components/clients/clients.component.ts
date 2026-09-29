import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { tns } from 'tiny-slider/src/tiny-slider';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  slider: any;

  ngAfterViewInit() {
    const sliderContainer = document.querySelector('.tiny-single-item');
    if (sliderContainer) {
      this.slider = tns({
        container: '.tiny-single-item',
        items: 1,
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition:  "bottom",
        speed: 400,
        gutter: 16,
      });
    }
  }
    clientData = [
      {
        image:'assets/images/client/01.jpg',
        name:'Christa Smith',
        title:'Manager',
        desc:'" Hously made the processes so easy. Hously instantly increased the amount of interest and ultimately saved us over $10,000. "'
      },
      {
        image:'assets/images/client/02.jpg',
        name:'Christa Smith',
        title:'Manager',
        desc:'" I highly recommend Hously as the new way to sell your home "by owner". My home sold in 24 hours for the asking price. Best $400 you could spend to sell your home. "'
      },
      {
        image:'assets/images/client/03.jpg',
        name:'Christa Smith',
        title:'Manager',
        desc:'" My favorite part about selling my home myself was that we got to meet and get to know the people personally. This made it so much more enjoyable!  "'
      },
      {
        image:'assets/images/client/04.jpg',
        name:'Christa Smith',
        title:'Manager',
        desc:'" Great experience all around! Easy to use and efficient. "'
      },
      {
        image:'assets/images/client/05.jpg',
        name:'Christa Smith',
        title:'Manager',
        desc:'" Hously made selling my home easy and stress free. They went above and beyond what is expected. "'
      },
      {
        image:'assets/images/client/06.jpg',
        name:'Christa Smith',
        title:'Manager',
        desc:'" Hously is fair priced, quick to respond, and easy to use. I highly recommend their services! "'
      },
    ]
}
