import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  constructor(private http: HttpClient, private cookie: CookieService) { }
/* Depot Master */
  depotMaster(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment.url}/depot/depotsList`, data, httpOptions);
  }
  depotInfo(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment.url}/depot/depotsList`, data, httpOptions);
  }
  deleteDepot(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment.url}/depot/changeDepotStatus`, data, httpOptions);
  }
  updateDepot(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment.url}/depot/updateDepot`, data, httpOptions);
  }
/* Dealer Master */
  getDealers(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment.url}/dealer/dealers`, data, httpOptions);
  }
  /* Customer Master */
  getCustomers(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment.url}/viewCustomer`, data, httpOptions);
  }
  /* Roles Master */
  getRoles(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/viewRoles`, httpOptions);
  }
  /* variant Master */
  getVariant(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/viewVariant`, httpOptions);
  }
  /* On Power */
  getOnPower(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/viewOnPower`, httpOptions);
  }
  /* viewTransporter */
  getTransporter(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/viewTransporter`, httpOptions);
  }
  /* viewPart */
  getParts(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/viewPart`, httpOptions);
  }
  /* usersList */
  getusers(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/usersList`, httpOptions);
  }
  /* viewFinancialInst */
  getFinancialInst(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/viewFinancialInst`, httpOptions);
  }
  /* viewStates */
  getState(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/viewStates`, httpOptions);
  }
  /* zonesList */
  getzones(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/zonesList`, httpOptions);
  }
  /* getCities */
  getCity(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment.url}/getCities`, httpOptions);
  }
}
