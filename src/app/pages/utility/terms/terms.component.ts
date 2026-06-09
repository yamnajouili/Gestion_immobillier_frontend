import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, 
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {
  accordianData = [
    {
      id:1,
      title:'How does it work ?',
      desc:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
    },
    {
      id:2,
      title:'Do I need a designer to use Hously ?',
      desc:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
    },
    {
      id:3,
      title:'What do I need to do to start selling ?',
      desc:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
    },
    {
      id:4,
      title:'What happens when I receive an order ?',
      desc:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
    },
  ]

  activeIndex:number = 1

  activeTab(index:number){
    this.activeIndex = index
  }
}
