import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tagline',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './tagline.component.html',
  styleUrl: './tagline.component.scss'
})
export class TaglineComponent {

}
