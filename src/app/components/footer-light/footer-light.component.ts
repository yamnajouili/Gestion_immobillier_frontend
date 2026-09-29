import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-light',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './footer-light.component.html',
  styleUrl: './footer-light.component.scss'
})
export class FooterLightComponent {
  date:number = new Date().getFullYear()
}
