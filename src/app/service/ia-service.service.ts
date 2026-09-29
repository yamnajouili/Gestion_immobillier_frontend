import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IaServiceService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getRecommandations(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/ia/recommandations`
    );
  }
}
