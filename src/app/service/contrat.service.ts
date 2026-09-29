import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Contrat} from '../Models/contrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient,private router:Router) { }



  getByToken(id: string): Observable<Contrat> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Contrat>(`${this.apiUrl}/contrats/token/${id}`,{ headers });
  }

  signer(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/contrats/sign/${id}`, {headers});
  }



  getAllContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiUrl}/contrats`);
  }


  addContrat(contrat: Contrat): Observable<Contrat> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<Contrat>(
      `${this.apiUrl}/contrats/add`,
      contrat,
      { headers }
    );

  }


  getMesContrats(): Observable<any[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Contrat[]>(
      `${this.apiUrl}/contrats/mes-contrats`,
      { headers }
    );
  }

  getContratById(id: number): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(
      `${this.apiUrl}/contrats/${id}`,
      { headers }
    );
  }


  getMesContratsProprietaire(): Observable<any[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/contrats/mes-contrats-proprietaire`,
      { headers }
    );
  }


}
