import { CommonModule } from '@angular/common';
import { AfterViewInit, Component,} from '@angular/core';
import { RouterLink } from '@angular/router';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})

export class ErrorComponent implements AfterViewInit {

  ngAfterViewInit() {
    feather.replace();
  }
}

