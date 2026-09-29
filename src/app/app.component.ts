import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SwitcherComponent } from './components/switcher/switcher.component';
import {SimplebarAngularModule} from 'simplebar-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SwitcherComponent,
    SimplebarAngularModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
