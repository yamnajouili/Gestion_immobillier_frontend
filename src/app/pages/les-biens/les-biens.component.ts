import {Component, OnInit} from '@angular/core';
import {Bien} from '../../Models/bien';
import {BienService} from '../../service/bien.service';
import {Router, RouterLink} from '@angular/router';
import {CommonModule, NgFor} from '@angular/common';
import {SidebaruserComponent} from '../../components/sidebaruser/sidebaruser.component';
import {TopbarComponent} from '../../components/topbar/topbar.component';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-les-biens',
  imports: [RouterLink,NgFor,CommonModule,SidebaruserComponent,SidebaruserComponent,TopbarComponent],
  templateUrl: './les-biens.component.html',
  styleUrl: './les-biens.component.scss'
})
export class LesBiensComponent implements OnInit{
  biens: Bien[] = [];
  isLoading: boolean = false;
  activeSidebar:boolean = true;

  constructor(private bienService: BienService,private router:Router) {}

  ngOnInit(): void {
    this.loadMyBiens();
  }

  loadMyBiens() {

    this.isLoading = true;

    this.bienService.getBiens().subscribe({
      next: (data) => {
        this.biens = data;
        console.log("les bien",this.biens)
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }


  contactOwner(item: Bien): void {
    this.router.navigate(['/chat'], {
      queryParams: {
        recipientId: item.id,
        propertyId: item.id,
        propertyTitle: item.titre
      }
    });
  }


  toggleClass() {
    this.activeSidebar = !this.activeSidebar;
  }

}
