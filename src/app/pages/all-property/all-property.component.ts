import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {BienService} from '../../service/bien.service';
import {Bien} from '../../Models/bien';

@Component({
  selector: 'app-all-property',
  imports: [
    RouterLink,
    NgClass,
    SidebarComponent ,
    TopbarComponent,
    FooterAdminComponent,
    NgFor,
    NgIf],
  templateUrl: './all-property.component.html',
  styleUrl: './all-property.component.scss'
})
export class AllPropertyComponent implements OnInit{


  activeSidebar:boolean = true
  biens: Bien[] = [];
  isLoading: boolean = false;

  constructor(private bienService: BienService) {}

  ngOnInit(): void {
    this.loadMyBiens();
  }

  loadMyBiens() {

    this.isLoading = true;

    this.bienService.getMyBiens().subscribe({
      next: (data) => {
        this.biens = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }



}
