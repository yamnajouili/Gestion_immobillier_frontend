import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
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



}
