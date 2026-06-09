import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Client} from '../Models/client';
import {Observable} from 'rxjs';
import {AuthenticationResponse} from '../Models/authentication-response';
import {Propriétaire} from '../Models/propriétaire';

@Injectable({
  providedIn: 'root'
})
export class PropriétaireService {

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient, private router: Router) {
  }


  register(request: Propriétaire): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/proprietaires/register`, request);
  }
}
