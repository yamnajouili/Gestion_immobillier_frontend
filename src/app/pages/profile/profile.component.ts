import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import * as feather from 'feather-icons';
import { RouterLink } from '@angular/router';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {UserService} from '../../service/user.service';
import {User} from '../../Models/user';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    RouterLink,
    SidebaruserComponent,FooterAdminComponent
  ],

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  activeSidebar:boolean = true
  user:User=new User();
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
