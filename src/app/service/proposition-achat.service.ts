import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Propositionachat} from '../Models/propositionachat';

@Injectable({
  providedIn: 'root'
})
export class PropositionAchatService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}


  ajouter(proposition:Propositionachat): Observable<Propositionachat> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post<Propositionachat>(
      `${this.apiUrl}/propositions/add`,
      proposition,
      { headers }
    );
  }


  // Client : consulter ses propositions
  getByClient(clientId: number): Observable<Propositionachat[]> {
    return this.http.get<Propositionachat[]>(
      `${this.apiUrl}/propositions/client/${clientId}`
    );
  }

  // Propriétaire : propositions d'un bien
  getByBien(bienId: number): Observable<Propositionachat[]> {
    return this.http.get<Propositionachat[]>(
      `${this.apiUrl}/propositions/bien/${bienId}`
    );
  }

  // Propriétaire : accepter
  accepter(id: number): Observable<Propositionachat> {
    return this.http.put<Propositionachat>(
      `${this.apiUrl}/propositions/accepter/${id}`,
      {}
    );
  }

  // Propriétaire : refuser
  refuser(id: number): Observable<Propositionachat> {
    return this.http.put<Propositionachat>(
      `${this.apiUrl}/propositions/refuser/${id}`,
      {}
    );
  }
  // Propriétaire : consulter toutes les propositions reçues
  getByProprietaire(): Observable<Propositionachat[]> {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<Propositionachat[]>(
      `${this.apiUrl}/propositions/proprietaire`,
      { headers }
    );
  }

  }
