import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Visite} from '../Models/visite';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {

  apiUrl = environment.apiUrl

  constructor(private http: HttpClient, private router: Router) {
  }

  createVisite(visiteData: Visite): Observable<Visite> {
    return this.http.post<Visite>(`${this.apiUrl}/visites/add`, visiteData);
  }
}
