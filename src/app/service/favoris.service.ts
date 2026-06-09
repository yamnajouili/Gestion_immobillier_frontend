import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Favoris } from '../Models/favoris';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ ADD FAVORIS
  ajouterFavoris(favoris: Favoris): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      return this.http.post(
        `${this.apiUrl}/favoris/add`,
        favoris,
        {
          headers,
          responseType: 'text'  // ← AJOUTEZ CECI
        }
      );
    } else {
      throw new Error("Token not found");
    }
  }



  supprimerFavorisParBienId(bienId: number): Observable<string> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      // Corps de la requête avec bienId
      const body = { bienId: bienId };

      return this.http.delete(
        `${this.apiUrl}/favoris/delete-by-bien`,
        {
          headers,
          body: body,  // ← Envoi du bienId dans le body
          responseType: 'text'
        }
      );
    } else {
      throw new Error("Token not found");
    }
  }





}
