import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss'
})
export class SwitcherComponent {
  topFunction(){
    window.scrollTo(0,0)
  }
 
  toggleMode() {
    const switcherRtl = document.getElementById("switchRtl") as any;
    if (switcherRtl.innerText === "LTR") {
      document.documentElement.dir = "ltr"
    }
    else {
      document.documentElement.dir = "rtl"
    }
  }

  changeMode() {
    const htmlTag = document.documentElement;
    if (htmlTag.className.includes("dark")) {
      htmlTag.className = 'light'
    } else {
      htmlTag.className = 'dark'
    }
  }
}
