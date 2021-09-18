import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MastersService {

  public sub = new BehaviorSubject<any>([]);
  private masterSubject: BehaviorSubject<any>;
  public master: Observable<any>;

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.masterSubject = new BehaviorSubject<any>(this.cookie.get('token'));
    this.master = this.masterSubject.asObservable();
  }
/* Depot Master */
  depotMaster(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/depot/depotsList`, data, httpOptions);
  }
  depotInfo(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/depot/depotsList`, data, httpOptions);
  }
  deleteDepot(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/depot/changeDepotStatus`, data, httpOptions);
  }
  updateDepot(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/depot/updateDepot`, data, httpOptions);
  }
/* Dealer Master */
  getDealers(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/dealer/dealers`, data, httpOptions);
  }
  // /dealer/changeDealerStatus
  changeDealerStatus(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/dealer/changeDealerStatus`, data, httpOptions);
  }
  /* Customer Master */
  getCustomers(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/viewCustomer`, data, httpOptions);
  }
  deleteCustomer(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/deleteCustomer`, data, httpOptions);
  }
  /* Roles Master */
  getRoles(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/viewRoles`, httpOptions);
  }
  /* variant Master */
  getVariant(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/viewVariant`, httpOptions);
  }
  /* On Power */
  getOnPower(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/viewOnPower`, httpOptions);
  }
  /* viewTransporter */
  getTransporter(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get<any[]>(`${environment._url}/viewTransporter`, httpOptions);
  }
  /* viewPart */
  getParts(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/viewPart`, httpOptions);
  }
  /* usersList */
  getusers(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/usersList`, httpOptions);
  }
  /* viewFinancialInst */
  getFinancialInst(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/viewFinancialInst`, httpOptions);
  }
  /* viewStates */
  getState(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/viewStates`, httpOptions);
  }
  /* zonesList */
  getzones(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/zonesList`, httpOptions);
  }
  /* getCities */
  getCity(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/getCities`, httpOptions);
  }
  deactiveCity(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/deleteCity`, data, httpOptions);
  }
}
