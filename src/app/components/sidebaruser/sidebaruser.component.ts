import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import * as feather from 'feather-icons';
import SimpleBar from 'simplebar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sidebaruser',
  imports: [RouterModule,CommonModule,SidebaruserComponent],
  templateUrl: './sidebaruser.component.html',
  styleUrl: './sidebaruser.component.scss'
})
export class SidebaruserComponent implements OnInit, AfterViewInit {
  activeManu:string = '';
  manuOpen:string = ''

  constructor( private router : Router) {}
@ViewChild('simplebar') simplebarRef!: ElementRef;

  ngAfterViewInit() {
    feather.replace();

    setTimeout(() => {
      if (this.simplebarRef) {
        new SimpleBar(this.simplebarRef.nativeElement);
      } else {
        console.error('simplebarRef is undefined');
      }
    });

  }

  ngOnInit(): void {
    this.activeManu = this.router.url;
    window.scrollTo(0, 0);
    this.manuOpen= this.activeManu
  }

  manu:boolean = true;

  subManu(item:any){
    this.manu = !this.manu;
    this.manuOpen = item
  }

}
