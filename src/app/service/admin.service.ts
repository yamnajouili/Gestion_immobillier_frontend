import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient) { }


  updateProfile(data: any): Observable<any> {

    const token = localStorage.getItem('token');

    return this.http.put<any>(
      `${this.apiUrl}/admins/profile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
