import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  viewDepot(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get(`${environment.url}/viewDepo`, httpOptions);
  }

  getModel(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get(`${environment.url}/variant/models`, httpOptions);
  }

  depotLocationFilter(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get<any>(`${environment.url}/viewDepo`, httpOptions);
  }
}
