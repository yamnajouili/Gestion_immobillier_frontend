import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Client} from '../Models/client';
import {Observable} from 'rxjs';
import {AuthenticationResponse} from '../Models/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient,private router:Router) { }



  register(request: Client): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/cliens/register`, request);
  }

  updateProfile(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});

    return this.http.put<any>(
      `${this.apiUrl}/cliens/profile`,
      data,
      { headers }
    );
  }

}
