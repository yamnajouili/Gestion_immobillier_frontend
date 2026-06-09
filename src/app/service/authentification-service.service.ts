import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {deleteToken} from '../../main';
import {AuthenticationResponse} from '../Models/authentication-response';
import {JsonPipe} from '@angular/common';
import {AuthenticationRequest} from '../Models/authentication-request';
import {ToastrService} from 'ngx-toastr';
import {UserService} from './user.service';
import {Role} from '../Enum/role';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationServiceService {
  private api =environment.apiUrl;
  public loggedIn: boolean = false;
  public  tokenKey: string="token";
  private loggedInKey = 'isUserLoggedIn';
  public isUserLoggedIn: boolean = false;
  constructor(private http : HttpClient, private router : Router,private toastr: ToastrService,private userservice :UserService) {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
  }


  login(username: string, password: string): Observable<any> {
    const body = { "email":username, "password":password };
    this.loggedIn = true;
    localStorage.setItem('loggedIn', 'true');
    return this.http.post<any>(this.api+'/users/auth/authenticate', body);
  }


  // loggedinUser(request: AuthenticationRequest) {
  //   this.http.post<AuthenticationResponse>(`${this.api}/users/auth/authenticate`, request).subscribe({
  //     next: (token: AuthenticationResponse) => {
  //       console.log("response data:", token);
  //
  //       localStorage.setItem(this.tokenKey, token.access_token);
  //       localStorage.setItem(this.loggedInKey, 'true');
  //
  //       // Toastr succès
  //       this.toastr.success('Bienvenue sur votre espace personnel', 'Connexion réussie !', {
  //         timeOut: 3000,
  //         progressBar: true,
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //
  //       this.router.navigate(['/dhashboard']);
  //       this.isUserLoggedIn = true;
  //     },
  //     error: (error) => {
  //       console.error('Erreur:', error);
  //
  //       // Toastr erreur
  //       this.toastr.error('Email ou mot de passe incorrect', 'Erreur d\'authentification', {
  //         timeOut: 3000,
  //         progressBar: true,
  //         closeButton: true,
  //         positionClass: 'toast-top-center'
  //       });
  //     }
  //   });
  // }





  loggedInUser(request: AuthenticationRequest) {
    this.http.post<AuthenticationResponse>(`${this.api}/users/auth/authenticate`, request).subscribe({
      next: (token: AuthenticationResponse) => {
        console.log("response data:", token);

        localStorage.setItem(this.tokenKey, token.access_token);
        localStorage.setItem(this.loggedInKey, 'true');

        // Appeler current-user après login
        this.userservice.getUserConnecte().subscribe({
          next: (user) => {
            console.log("user connecté:", user);

            this.toastr.success('Bienvenue sur votre espace personnel', 'Connexion réussie !', {
              timeOut: 3000,
              progressBar: true,
              closeButton: true,
              positionClass: 'toast-top-right'
            });

            // Rediriger selon le role
            if (user.role == Role.CLIENT) {
              this.router.navigate(['/dhashboard']);
            } else if (user.role == Role.PROPRIETAIRE) {
              this.router.navigate(['/dhashboard-pro']);
            } else {
              this.router.navigate(['/404']);
            }

            this.isUserLoggedIn = true;
          },
          error: (err) => {
            console.error('Erreur current-user:', err);
            this.router.navigate(['/404']); // fallback
          }
        });

      },
      error: (error) => {
        console.error('Erreur:', error);
        this.toastr.error('Email ou mot de passe incorrect', 'Erreur d\'authentification', {
          timeOut: 3000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-center'
        });
      }
    });
  }







  logout() {
    deleteToken();
    this.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
