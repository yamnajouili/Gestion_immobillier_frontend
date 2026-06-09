import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {RouterLink} from '@angular/router';
import {SwitcherComponent} from '../../components/switcher/switcher.component';

@Component({
  selector: 'app-guide',
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    SwitcherComponent

  ],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss'
})
export class GuideComponent {
  activeindex: number = 1;

  constructor() { }

  formTab(index: number) {
    this.activeindex = index;
  }
}
