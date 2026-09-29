import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Preutilisateur} from '../Models/preutilisateur';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  createPreference(preference: Preutilisateur): Observable<any> {

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<any>(
      `${this.apiUrl}/preferences/add`,
      preference,
      { headers });
  }

  getRecommandations(): Observable<any[]> {

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/api/ia/recommandations`,
      { headers }
    );
  }
}
