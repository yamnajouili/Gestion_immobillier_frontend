import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer-admin',
  imports: [],
  templateUrl: './footer-admin.component.html',
  styleUrl: './footer-admin.component.scss'
})
export class FooterAdminComponent implements OnInit{

  date:any;
  ngOnInit(): void {
    this.date = new Date().getFullYear();
  }

}
