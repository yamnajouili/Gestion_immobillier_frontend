import { Component } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {ContratService} from '../../service/contrat.service';
import {Contrat} from '../../Models/contrat';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';

@Component({
  selector: 'app-detail-contrat',
  imports: [CommonModule, FormsModule,SidebaruserComponent,TopbarComponent,FooterAdminComponent,RouterModule],
  templateUrl: './detail-contrat.component.html',
  styleUrl: './detail-contrat.component.scss'
})
export class DetailContratComponent {
  contrat: Contrat = new Contrat();
  activeSidebar:boolean = true
  constructor(
    private route: ActivatedRoute,
    private contratService: ContratService
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('ID contrat :', id);

    this.getContratById(id);
  }

  toggleClass(): void {

    this.activeSidebar = !this.activeSidebar;

  }

  getContratById(id: number): void {

    this.contratService.getContratById(id).subscribe({

      next: (data) => {
        this.contrat = data;
        console.log('Contrat récupéré :', data);
      },

      error: (error) => {
        console.error(
          'Erreur récupération contrat :',
          error
        );
      }

    });
  }
}
