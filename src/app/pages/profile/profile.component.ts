import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import * as feather from 'feather-icons';
import { RouterLink } from '@angular/router';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    RouterLink
  ],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  activeSidebar:boolean = true

  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }

  ngAfterViewInit() {
    feather.replace();
  }
  // propertyData = PropertyData

  setFile:any;
  handleChange(e:any){
    this.setFile = URL.createObjectURL(e.target.files[0])
  }
}
