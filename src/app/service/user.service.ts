import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterRequest} from '../Models/register-request';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }


  getUserConnecte(): Observable<RegisterRequest> {
    let token: string | null = null;

    // Check if running in the browser (localStorage exists)
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem('token'); // Use lowercase 'token'
    }

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set("Content-Type", "application/json; charset=utf8");
      return this.http.get<RegisterRequest>(`${this.apiUrl}/users/current-user`, { headers });
    } else {
      // Return an empty observable if no token is available
      return new Observable<RegisterRequest>();
    }
  }


  changePassword(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});

    return this.http.put<any>(
      `${this.apiUrl}/users/change-password`,
      data,
      { headers }
    );
  }

  getDashboardClient() {
    return this.http.get(`${environment.apiUrl}/api/dashboard`);
  }
  retirerFavori(id: number) {
    return this.http.delete(`/api/favoris/${id}`);
  }


}
