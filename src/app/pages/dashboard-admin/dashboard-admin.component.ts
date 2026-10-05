import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {AboutUserComponent} from '../../components/about-user/about-user.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {RouterModule} from '@angular/router';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-dashboard-admin',
  imports: [CommonModule, FormsModule, NavbarComponent,SidebarAdminComponent, TopbarComponent,AboutUserComponent,FooterAdminComponent,RouterModule                                 // ← Nécessaire pour routerLink
  ],  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {
  activeSidebar:boolean = true
  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }

}
