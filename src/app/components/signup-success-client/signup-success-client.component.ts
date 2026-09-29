import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {BackToHomeComponent} from '../back-to-home/back-to-home.component';

@Component({
  selector: 'app-signup-success-client',
  imports: [RouterLink
  ,BackToHomeComponent],
  templateUrl: './signup-success-client.component.html',
  styleUrl: './signup-success-client.component.scss'
})
export class SignupSuccessClientComponent {
  date:any;
  ngOnInit(): void {
    this.date = new Date().getFullYear();
  }
}
