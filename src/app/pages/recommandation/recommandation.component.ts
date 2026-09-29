import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {AboutUserComponent} from '../../components/about-user/about-user.component';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {Router, RouterModule} from '@angular/router';
import {PreferenceService} from '../../service/preference.service';

@Component({
  selector: 'app-recommandation',
  imports: [CommonModule, FormsModule,SidebaruserComponent,TopbarComponent,FooterAdminComponent,RouterModule],
  templateUrl: './recommandation.component.html',
  styleUrl: './recommandation.component.scss'
})
export class RecommandationComponent implements OnInit {
  activeSidebar:boolean = true
  recommandations: any[] = [];

  loading: boolean = true;


  constructor(
    private preferenceService:PreferenceService, private router: Router) {}


  ngOnInit(): void {

    this.getRecommandations();

  }


  getRecommandations(): void {

    this.loading = true;

    this.preferenceService.getRecommandations().subscribe({

      next: (data) => {
        console.log('Recommandations IA :', data);

        this.recommandations = data;
        this.loading = false;
      },

      error: (error) => {
        console.error('Erreur recommandations :', error);

        this.recommandations = [];
        this.loading = false;
      }

    });
  }


  toggleClass(): void {

    this.activeSidebar = !this.activeSidebar;

  }



  voirBien(id: number): void {

    console.log('Bien sélectionné :', id);

    this.router.navigate([
      '/property-detail-two',
      id
    ]);
  }
}
