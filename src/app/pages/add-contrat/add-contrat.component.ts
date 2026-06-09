import {Component} from '@angular/core';
import {BienService} from '../../service/bien.service';
import {ContratService} from '../../service/contrat.service';
import {ToastrService} from 'ngx-toastr';
import {CommonModule, NgClass} from '@angular/common';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FooterAdminComponent} from '../../components/footer-admin/footer-admin.component';
import {Contrat} from '../../Models/contrat';
import {Statutcontrat} from '../../Enum/statutcontrat';

@Component({
  selector: 'app-add-contrat',
  imports: [NgClass,SidebarComponent,TopbarComponent,RouterLink,CommonModule, FormsModule,FooterAdminComponent],
  templateUrl: './add-contrat.component.html',
  styleUrl: './add-contrat.component.scss'
})
export class AddContratComponent {

  activeSidebar: boolean = true;

  etape: number = 1;

  isLoading: boolean = false;

  biens: any[] = [];

  contrat:Contrat=new Contrat();

  constructor(
    private bienService: BienService,
    private contratService: ContratService,
    private toastr: ToastrService,private router:Router
  ) {}

  ngOnInit(): void {
    this.loadBiens();
  }

  loadBiens() {

    this.bienService.getMyBiens()
      .subscribe({

        next: (res: any) => {

          this.biens = res;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  nextStep() {

    if (this.etape < 4) {

      this.etape++;

    }

  }

  prevStep() {

    if (this.etape > 1) {

      this.etape--;

    }

  }

  toggleClass() {

    this.activeSidebar = !this.activeSidebar;

  }

  submit(): void {
    this.isLoading = true;

    // ✅ Envoi direct du contrat (avec clientEmail)
    this.contratService.addContrat(this.contrat).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert(`✅ Contrat créé !\n📧 Email envoyé à ${this.contrat.clientEmail}`);
        this.router.navigate(['/contrats']);
      },
      error: (err) => {
        this.isLoading = false;
        alert(`❌ Erreur: ${err.error?.message || 'Veuillez réessayer'}`);
      }
    });
  }
}
