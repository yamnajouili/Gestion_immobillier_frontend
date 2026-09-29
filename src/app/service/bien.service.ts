import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Bien} from '../Models/bien';

@Injectable({
  providedIn: 'root'
})
export class BienService {

  apiUrl=environment.apiUrl
  constructor(private http: HttpClient,private router:Router) { }


  createBienWithImages(bien: any, files: File[]) {

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("Token not found");
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const formData = new FormData();

    // 🔥 JSON → Blob (IMPORTANT avec @RequestPart DTO)
    const bienBlob = new Blob(
      [JSON.stringify(bien)],
      { type: 'application/json' }
    );

    formData.append('bien', bienBlob);

    // 📸 fichiers
    files.forEach(file => {
      formData.append('files', file);
    });

    return this.http.post<any>(
      `${this.apiUrl}/biens/add-with-images`,
      formData,
      { headers }
    );
  }

  getBiens(): Observable<any[]> {


    return this.http.get<any[]>(
      `${this.apiUrl}/biens/read`);
  }


  getMyBiens(): Observable<any[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      `${this.apiUrl}/biens/my-biens`,
      { headers }
    );
  }

  getBienById(id: number): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(
      `${this.apiUrl}/biens/${id}`,
      { headers }
    );
  }


  updateBien(bien: Bien): Observable<Bien> {
    return this.http.put<Bien>(
      `${this.apiUrl}/biens/update`,
      bien
    );
  }
  deleteBien(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/biens/delete/${id}`
    );
  }





  deleteImage(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(
      `${this.apiUrl}/api/images/${id}`,
      {
        headers,
        responseType: 'text'
      }
    );
  }

  uploadImages(bienId: number, files: File[]): Observable<any> {

    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    return this.http.post(
      `${this.apiUrl}/api/upload/multiple/${bienId}`,
      formData,
      {
        responseType: 'text'
      }
    );
  }


}
