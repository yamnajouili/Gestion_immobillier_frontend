import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import SimpleBar from 'simplebar';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements
OnInit, AfterViewInit {
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
