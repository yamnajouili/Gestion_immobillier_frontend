import { Component } from '@angular/core';
import {User} from '../../Models/user';
import {UserService} from '../../service/user.service';
import * as feather from 'feather-icons';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {RouterLink} from '@angular/router';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {SidebarAdminComponent} from '../../components/sidebar-admin/sidebar-admin.component';
import {TopBarAdminComponent} from '../../components/top-bar-admin/top-bar-admin.component';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-profile-admin',
  imports: [
    CommonModule,
    TopBarAdminComponent,
    SidebarAdminComponent,FooterAdminComponent
  ],
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.scss'
})
export class ProfileAdminComponent {
  activeSidebar:boolean = true
  user:User=new User();
  apiUrl = environment.apiUrl;

  constructor(
    private userservice: UserService
  ) {}


  ngOnInit(): void {

    this.getUserConnecte();

  }


  getUserConnecte(): void {

    this.userservice.getUserConnecte().subscribe({

      next: (value) => {

        this.user = value;

        console.log(
          'récupération utilisateur connecté avec succès :',
          value
        );

      },

      error: (error) => {

        console.error(
          'Erreur lors de la récupération utilisateur connecté',
          error
        );

      }

    });

  }


  // =====================================
  // PREVIEW BANNIERE
  // =====================================



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
