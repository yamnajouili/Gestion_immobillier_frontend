import {CommonModule, JsonPipe} from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import * as feather from 'feather-icons';
import {AuthentificationServiceService} from '../../../service/authentification-service.service';
import {FormsModule} from '@angular/forms';
import {setToken} from '../../../../main';
import {AuthenticationRequest} from '../../../Models/authentication-request';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})

export class AuthLoginComponent implements
  OnInit, AfterViewInit {
  public username: string="";
  public password: string="";
  authenticationRequest:AuthenticationRequest=new AuthenticationRequest();


  constructor(private authentificationService: AuthentificationServiceService,
              private router: Router)  {}

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    feather.replace();
  }

  loginUser(){
    this.authentificationService.loggedInUser(this.authenticationRequest)
  }
}
