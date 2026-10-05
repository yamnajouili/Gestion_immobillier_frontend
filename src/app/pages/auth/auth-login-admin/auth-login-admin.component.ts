import { Component } from '@angular/core';
import {setToken} from '../../../../main';
import {AuthentificationServiceService} from '../../../service/authentification-service.service';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationRequest} from '../../../Models/authentication-request';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-auth-login-admin',
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './auth-login-admin.component.html',
  styleUrl: './auth-login-admin.component.scss'
})
export class AuthLoginAdminComponent {
  authenticationRequest: AuthenticationRequest = new AuthenticationRequest();

  errorMessage: string = '';

  isLoading: boolean = false;


  constructor(private authentificationService: AuthentificationServiceService, private router: Router) {}


  ngOnInit(): void {
  }

  loginAdmin(): void {
    this.authentificationService.loggedInAdmin(
      this.authenticationRequest
    );
  }




}
