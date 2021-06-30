import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MastersService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
  constructor(private http: HttpClient) { }
/* Depot Master */
  depotMaster(data: any): Observable<any> {
    return this.http.post(`${environment.url}/depot/depotsList`, data, this.httpOptions);
  }
  depotInfo(data: any): Observable<any> {
    return this.http.post(`${environment.url}/depot/depotsList`, data, this.httpOptions);
  }
  deleteDepot(data: any): Observable<any> {
    return this.http.post(`${environment.url}/depot/changeDepotStatus`, data, this.httpOptions)
  }
  updateDepot(data: any): Observable<any> {
    return this.http.post(`${environment.url}/depot/updateDepot`, data, this.httpOptions)
  }
/* Dealer Master */
  getDealers(data: any): Observable<any> {
    return this.http.post(`${environment.url}/dealer/dealers`, data, this.httpOptions)
  } 
  /* Customer Master */
  getCustomers(data: any): Observable<any> {
    return this.http.post(`${environment.url}/viewCustomer`, data, this.httpOptions)
  } 
  /* Roles Master */
  getRoles(): Observable<any> {
    return this.http.get(`${environment.url}/viewRoles`, this.httpOptions)
  }   
  /* variant Master */
  getVariant(): Observable<any> {
    return this.http.get(`${environment.url}/viewVariant`, this.httpOptions)
  } 
  /* On Power */
  getOnPower(): Observable<any> {
    return this.http.get(`${environment.url}/viewOnPower`, this.httpOptions)
  } 
  /* viewTransporter */
  getTransporter(): Observable<any> {
    return this.http.get(`${environment.url}/viewTransporter`, this.httpOptions)
  } 
  /* viewPart */
  getParts(): Observable<any> {
    return this.http.get(`${environment.url}/viewPart`, this.httpOptions)
  } 
  /* usersList */
  getusers(): Observable<any> {
    return this.http.get(`${environment.url}/usersList`, this.httpOptions)
  } 
  /* viewFinancialInst */
  getFinancialInst(): Observable<any> {
    return this.http.get(`${environment.url}/viewFinancialInst`, this.httpOptions)
  } 
  /* viewStates */
  getState(): Observable<any> {
    return this.http.get(`${environment.url}/viewStates`, this.httpOptions)
  } 
  /* zonesList */
  getzones(): Observable<any> {
    return this.http.get(`${environment.url}/zonesList`, this.httpOptions)
  } 
  /* getCities */
  getCity(): Observable<any> {
    return this.http.get(`${environment.url}/getCities`, this.httpOptions)
  } 
}
