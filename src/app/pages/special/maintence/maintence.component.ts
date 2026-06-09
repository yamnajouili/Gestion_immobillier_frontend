import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-maintence',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './maintence.component.html',
  styleUrl: './maintence.component.scss'
})

export class MaintenceComponent implements AfterViewInit {
 
  minutes:number = 0;
  remainingSeconds:number = 0;
  seconds:number=3599;
  intervalId:any = 0

  ngAfterViewInit() {
    feather.replace();
    
    this.intervalId = setInterval(() => {
        this.calculateTimeRemaining()
    }, 1000);
  }
      calculateTimeRemaining() {
          this.minutes = Math.round((this.seconds - 30) / 60);
          console.log(this.minutes);
          
          this.remainingSeconds = this.seconds % 60;
          if (this.seconds === 0) {
              clearInterval(this.intervalId);
          } else {
              this.seconds = this.seconds - 1;
          }
      }
  


}
