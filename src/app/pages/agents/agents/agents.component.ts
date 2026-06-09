import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { GetInTouchComponent } from '../../../components/get-in-tuch/get-in-touch.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule,NavbarComponent,RouterLink,GetInTouchComponent,FooterComponent],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss'
})
export class AgentsComponent {
  agentData =[
    {
      image:'assets/images/client/04.jpg',
      name:'Jack John',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/05.jpg',
      name:'Krista John',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/06.jpg',
      name:'Roger Jackson',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/07.jpg',
      name:'Johnny English',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/08.jpg',
      name:'Clayton Dalke',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/01.jpg',
      name:'Christopher Myers',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/02.jpg',
      name:'Mary Petersen',
      position:'Property Broker'
    },
    {
      image:'assets/images/client/03.jpg',
      name:'Amber Durden',
      position:'Property Broker'
    },
  ]
}
