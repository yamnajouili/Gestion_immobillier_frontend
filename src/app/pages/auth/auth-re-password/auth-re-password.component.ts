import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-auth-re-password',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './auth-re-password.component.html',
  styleUrl: './auth-re-password.component.scss'
})
export class AuthRePasswordComponent implements
  OnInit, AfterViewInit {


  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    feather.replace();
  }

}