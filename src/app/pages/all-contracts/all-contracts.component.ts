import {Component, OnInit} from '@angular/core';
import {CommonModule, NgClass, NgIf} from '@angular/common';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {RouterLink} from '@angular/router';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {Contrat} from '../../Models/contrat';
import {ContratService} from '../../service/contrat.service';

@Component({
  selector: 'app-all-contracts',
  imports: [NgClass,SidebarComponent,TopbarComponent,RouterLink,FooterAdminComponent,CommonModule,NgIf],
  templateUrl: './all-contracts.component.html',
  styleUrl: './all-contracts.component.scss'
})
export class AllContractsComponent implements OnInit{
  biens: any;
  activeSidebar:boolean = true
  contrats: Contrat[] = [];
  loading = false;

  constructor(private contratService: ContratService) {}

  ngOnInit(): void {
    this.getContrats();
  };


  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }
  getContrats() {
    this.loading = true;

    this.contratService.getAllContrats().subscribe({
      next: (data) => {
        this.contrats = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  isBientotExpire(dateFin: any): boolean {
    if (!dateFin) return false;

    const now = new Date();
    const fin = new Date(dateFin); // OK si ISO string

    if (isNaN(fin.getTime())) return false; // 🔥 sécurité

    const diffTime = fin.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays > 0 && diffDays <= 30;
  }

}
