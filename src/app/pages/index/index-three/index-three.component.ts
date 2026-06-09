import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ClientTwoComponent } from '../../../components/client-two/client-two.component';
import { CountUpModule } from 'ngx-countup';
import { CommonModule } from '@angular/common';
import { PropertiesThreeComponent } from '../../../components/properties-three/properties-three.component';
import { TeamComponent } from '../../../components/team/team.component';
import { FooterLightComponent } from '../../../components/footer-light/footer-light.component';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';

@Component({
  selector: 'app-index-three',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent,
    GetInTouchComponent,
    ClientTwoComponent, 
    CountUpModule,
    PropertiesThreeComponent,
    TeamComponent,
    FooterLightComponent
  ],
  templateUrl: './index-three.component.html',
  styleUrl: './index-three.component.scss'
})
export class IndexThreeComponent {
  counterData = [
    {
      target:1548,
      name:'Properties Sell'
    },
    {
      target:25,
      name:'Award Gained'
    },
    {
      target:9,
      name:'Years Experience'
    },
]

}
