import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Output  } from '@angular/core';
import { RouterLink } from '@angular/router';
// import {NgClickOutsideDirective} from 'ng-click-outside2';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,

    RouterLink
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

  @Output() toggleClass = new EventEmitter<void>();

  emitToggleClassEvent() {
    this.toggleClass.emit();
  }

  countryManu:boolean = false;

  countryDropdown(){
    this.countryManu = !this.countryManu;
  }
  onClickedOutside(e: Event) {
    this.countryManu = false;
  }

  notificationManu:boolean = false;

  notificationDropdown(){
    this.notificationManu = !this.notificationManu;
  }
  onClickedOutside2(e: Event) {
    this.notificationManu = false;
  }

  userManu:boolean = false;

  userDropdown(){
    this.userManu = !this.userManu;
  }
  onClickedOutside3(e: Event) {
    this.userManu = false;
  }


}
