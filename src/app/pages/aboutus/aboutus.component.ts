import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AboutComponent } from '../../components/about/about.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { CountUpModule } from 'ngx-countup';
import { TeamComponent } from '../../components/team/team.component';
import { ClientTwoComponent } from '../../components/client-two/client-two.component';
import { GetInTouchComponent } from '../../components/get-in-tuch/get-in-touch.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    AboutComponent,
    FeaturesComponent,
    CountUpModule,
    TeamComponent,
    ClientTwoComponent,
    GetInTouchComponent,
    FooterComponent
  ],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {

  counterData = [
    {
      target:1548,
      name:'Biens disponibles'
    },
    {
      target:25,
      name:'Utilisateurs inscrits'
    },
    {
      target:9,
      name:'Recommandations générées'
    },
]

}
