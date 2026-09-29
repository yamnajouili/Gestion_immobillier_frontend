// import { Injectable } from '@angular/core';
// import {environment} from '../environments/environment';
// import {Router} from '@angular/router';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {deleteToken} from '../../main';
// import {AuthenticationResponse} from '../Models/authentication-response';
// import {JsonPipe} from '@angular/common';
// import {AuthenticationRequest} from '../Models/authentication-request';
// import {ToastrService} from 'ngx-toastr';
// import {UserService} from './user.service';
// import {Role} from '../Enum/role';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthentificationServiceService {
//   private api =environment.apiUrl;
//   public loggedIn: boolean = false;
//   public  tokenKey: string="token";
//   private loggedInKey = 'isUserLoggedIn';
//   public isUserLoggedIn: boolean = false;
//   constructor(private http : HttpClient, private router : Router,private toastr: ToastrService,private userservice :UserService) {
//     this.loggedIn = localStorage.getItem('loggedIn') === 'true';
//   }
//
//
//   login(username: string, password: string): Observable<any> {
//     const body = { "email":username, "password":password };
//     this.loggedIn = true;
//     localStorage.setItem('loggedIn', 'true');
//     return this.http.post<any>(this.api+'/users/auth/authenticate', body);
//   }
//
//
//   // loggedinUser(request: AuthenticationRequest) {
//   //   this.http.post<AuthenticationResponse>(`${this.api}/users/auth/authenticate`, request).subscribe({
//   //     next: (token: AuthenticationResponse) => {
//   //       console.log("response data:", token);
//   //
//   //       localStorage.setItem(this.tokenKey, token.access_token);
//   //       localStorage.setItem(this.loggedInKey, 'true');
//   //
//   //       // Toastr succès
//   //       this.toastr.success('Bienvenue sur votre espace personnel', 'Connexion réussie !', {
//   //         timeOut: 3000,
//   //         progressBar: true,
//   //         closeButton: true,
//   //         positionClass: 'toast-top-right'
//   //       });
//   //
//   //       this.router.navigate(['/dhashboard']);
//   //       this.isUserLoggedIn = true;
//   //     },
//   //     error: (error) => {
//   //       console.error('Erreur:', error);
//   //
//   //       // Toastr erreur
//   //       this.toastr.error('Email ou mot de passe incorrect', 'Erreur d\'authentification', {
//   //         timeOut: 3000,
//   //         progressBar: true,
//   //         closeButton: true,
//   //         positionClass: 'toast-top-center'
//   //       });
//   //     }
//   //   });
//   // }
//
//
//
//
//
//   loggedInUser(request: AuthenticationRequest) {
//     this.http.post<AuthenticationResponse>(`${this.api}/users/auth/authenticate`, request).subscribe({
//       next: (token: AuthenticationResponse) => {
//         console.log("response data:", token);
//
//         localStorage.setItem(this.tokenKey, token.access_token);
//         localStorage.setItem(this.loggedInKey, 'true');
//
//         // Appeler current-user après login
//         this.userservice.getUserConnecte().subscribe({
//           next: (user) => {
//             console.log("user connecté:", user);
//
//             this.toastr.success('Bienvenue sur votre espace personnel', 'Connexion réussie !', {
//               timeOut: 3000,
//               progressBar: true,
//               closeButton: true,
//               positionClass: 'toast-top-right'
//             });
//
//             // Rediriger selon le role
//             if (user.role == Role.CLIENT) {
//               this.router.navigate(['/dhashboard']);
//             } else if (user.role == Role.PROPRIETAIRE) {
//               this.router.navigate(['/dhashboard-pro']);
//             } else {
//               this.router.navigate(['/404']);
//             }
//
//             this.isUserLoggedIn = true;
//           },
//           error: (err) => {
//             console.error('Erreur current-user:', err);
//             this.router.navigate(['/404']); // fallback
//           }
//         });
//
//       },
//       error: (error) => {
//         console.error('Erreur:', error);
//         this.toastr.error('Email ou mot de passe incorrect', 'Erreur d\'authentification', {
//           timeOut: 3000,
//           progressBar: true,
//           closeButton: true,
//           positionClass: 'toast-top-center'
//         });
//       }
//     });
//   }
//
//
//
//
//
//
//
//   logout(): void {
//     deleteToken();                          // supprime le token
//     localStorage.removeItem('user');
//     localStorage.removeItem('isUserLoggedIn');   // ✅ AJOUTER
// // supprime l'utilisateur
//     this.loggedIn = false;                  // met à jour l'état
//     this.router.navigate(['/auth-login']);  // redirige
//   }
//
//   isAuthenticated(): boolean {
//     return localStorage.getItem('isUserLoggedIn') === 'true';
//   }
// }
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthenticationResponse } from '../Models/authentication-response';
import { AuthenticationRequest } from '../Models/authentication-request';

import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { Role } from '../Enum/role';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationServiceService {

  private api = environment.apiUrl;
  private tokenKey = 'token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private userservice: UserService
  ) {}


  // ==========================================
  // LOGIN
  // ==========================================

  loggedInUser(request: AuthenticationRequest): void {

    this.http.post<AuthenticationResponse>(
      `${this.api}/users/auth/authenticate`,
      request
    ).subscribe({

      next: (response: AuthenticationResponse) => {

        console.log('response data:', response);

        // Sauvegarder le JWT
        localStorage.setItem(
          this.tokenKey,
          response.access_token
        );


        // Récupérer l'utilisateur connecté
        this.userservice.getUserConnecte().subscribe({

          next: (user) => {

            console.log('user connecté:', user);

            this.toastr.success(
              'Bienvenue sur votre espace personnel',
              'Connexion réussie !',
              {
                timeOut: 3000,
                progressBar: true,
                closeButton: true,
                positionClass: 'toast-top-right'
              }
            );


            // Redirection selon rôle
            if (user.role === Role.CLIENT) {

              this.router.navigate(['/dhashboard']);

            } else if (user.role === Role.PROPRIETAIRE) {

              this.router.navigate(['/dhashboard-pro']);

            } else {

              this.router.navigate(['/404']);
            }

          },

          error: (err) => {

            console.error(
              'Erreur current-user:',
              err
            );

            // Supprimer le token si current-user échoue
            localStorage.removeItem(this.tokenKey);

            this.router.navigate(['/auth-login']);
          }

        });

      },


      error: (error) => {

        console.error(
          'Erreur authentification:',
          error
        );

        // S'assurer qu'aucun ancien token ne reste
        localStorage.removeItem(this.tokenKey);

        this.toastr.error(
          'Email ou mot de passe incorrect',
          'Erreur d\'authentification',
          {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-center'
          }
        );

      }

    });
  }


  // ==========================================
  // EST-CE QUE L'UTILISATEUR EST CONNECTÉ ?
  // ==========================================

  isAuthenticated(): boolean {

    const token = localStorage.getItem(this.tokenKey);

    return !!token;
  }


  // ==========================================
  // LOGOUT
  // ==========================================

  logout(): void {

    // Supprimer le JWT
    localStorage.removeItem(this.tokenKey);

    // Nettoyer les anciennes valeurs
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');

    // Retour accueil
    this.router.navigate(['/']);
  }

}
