import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {RouterModule} from '@angular/router';
import {ContratService} from '../../service/contrat.service';

@Component({
  selector: 'app-mescontrat',
  imports: [CommonModule, FormsModule,SidebaruserComponent,TopbarComponent,FooterAdminComponent,RouterModule],
  templateUrl: './mescontrat.component.html',
  styleUrl: './mescontrat.component.scss'
})
export class MescontratComponent implements OnInit{
  activeSidebar:boolean = true
  contratsSignes: any[] = [];
constructor(private contratService:ContratService ) {
}

  ngOnInit(): void {
    this.getContratsSignes();
  }
  getContratsSignes(): void {

    this.contratService.getMesContrats().subscribe({

      next: (data) => {

        console.log('Contrats du client :', data);

        this.contratsSignes = data.filter(
          contrat => contrat.statut === 'EN_COURS'
        );

        console.log(
          'Contrats signés :',
          this.contratsSignes
        );
      },

      error: (error) => {
        console.error(
          'Erreur récupération contrats :',
          error
        );

        this.contratsSignes = [];
      }

    });
  }
  toggleClass(): void {

    this.activeSidebar = !this.activeSidebar;

  }
}
