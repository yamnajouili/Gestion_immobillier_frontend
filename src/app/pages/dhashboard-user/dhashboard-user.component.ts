import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { UserService } from '../../service/user.service';
import {User} from "../../Models/user";
import {TopbarComponent} from "../../components/topbar/topbar.component";
import {FooterAdminComponent} from "../../components/footer-admin/footer-admin.component";
import {AboutUserComponent} from "../../components/about-user/about-user.component";
import { RouterModule } from '@angular/router';
import {SidebaruserComponent} from "../../components/sidebaruser/sidebaruser.component";



@Component({
  selector: 'app-dhashboard-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent,SidebaruserComponent, TopbarComponent,AboutUserComponent,FooterAdminComponent,RouterModule                                 // ← Nécessaire pour routerLink
  ],
  templateUrl: './dhashboard-user.component.html',
  styleUrl: './dhashboard-user.component.scss'
})
export class DhashboardUserComponent implements OnInit {
  activeSidebar:boolean = true
  user:User=new User();
  constructor(private userservice:UserService ) {
  }
  getUserConnecte() {
    this.userservice.getUserConnecte().subscribe(
        value => {
          this.user = value;

          console.log("récupération de utilisateur connecté avec succes******************** : " + JSON.stringify(value));
        },
        error => {
          console.error('Erreur lors de la récupération de utilisateur connecté', error);
        }
    );
  }
  ngOnInit(): void {
    this.getUserConnecte();
  }


  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }

  saleData = [
    {
      title:'Via Website',
      value:'50%'
    },
    {
      title:'Via Team Member',
      value:'12%'
    },
    {
      title:'Via Agents',
      value:'6%'
    },
    {
      title:'Via Social Media',
      value:'15%'
    },
    {
      title:'Via Digital Marketing',
      value:'12%'
    },
    {
      title:'Via Others',
      value:'5%'
    },
  ]

  transection = [
    {
      image:'assets/images/property/1.jpg',
      date:'13th March 2023',
      name:'Mr. Rocky',
      price:'$1245/M',
      type:'Rent',
      status:'Paid'
    },
    {
      image:'assets/images/property/2.jpg',
      date:'5th May 2023',
      name:'Mr. Cristino',
      price:'$12450',
      type:'Sell',
      status:'Unpaid'
    },
    {
      image:'assets/images/property/3.jpg',
      date:'19th June 2023',
      name:'Mr. Jack',
      price:'$12450',
      type:'Sell',
      status:'Paid'
    },
    {
      image:'assets/images/property/4.jpg',
      date:'20th June 2023',
      name:'Ms. Cally',
      price:'$12450',
      type:'Sell',
      status:'Unpaid'
    },
    {
      image:'assets/images/property/5.jpg',
      date:'31st Aug 2023',
      name:'Ms. Cristina',
      price:'$1245/M',
      type:'Rent',
      status:'Unpaid'
    },
  ]

  topProperties = [
    {
      image:'assets/images/property/1.jpg',
      name:'House',
      place:'Baton Rouge, USA',
      value:'11%',
      status:'loss'
    },
    {
      image:'assets/images/property/2.jpg',
      name:'House',
      place:'Baton Rouge, USA',
      value:'20%',
      status:'profit'
    },
    {
      image:'assets/images/property/3.jpg',
      name:'House',
      place:'Baton Rouge, USA',
      value:'24%',
      status:'profit'
    },
    {
      image:'assets/images/property/4.jpg',
      name:'House',
      place:'Baton Rouge, USA',
      value:'21%',
      status:'profit'
    },
    {
      image:'assets/images/property/5.jpg',
      name:'House',
      place:'Baton Rouge, USA',
      value:'45%',
      status:'profit'
    },
  ]



}
