import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import * as feather from 'feather-icons';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
@Component({
  selector: 'app-profile-setting',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SidebarComponent,
    TopbarComponent,
    FooterAdminComponent  ],
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.scss'
})
export class ProfileSettingComponent {
  activeSidebar:boolean = true

  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }

  ngAfterViewInit() {
    feather.replace();
  }
}
