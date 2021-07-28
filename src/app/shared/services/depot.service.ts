import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private http: HttpClient) { }
  // depot filter data first filter

  getState(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get<any>(`${environment.url}/getStates`, httpOptions);
  }

  getTransport(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get<any>(`${environment.url}/viewTransporter`, httpOptions);
  }

  getDriver(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get<any>(`${environment.url}/viewOnPower`, httpOptions);
  }

  /* Depot stock */
  depotStock(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/getVehicles`, data, httpOptions);
  }

  getFilteredDepotStock(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/getFilteredDepotStock`, data, httpOptions);
  }

  // Depot Stock Variant Wise
  depotVariant(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/getVehiclesByVariant`, data, httpOptions);
  }

  // Depot to Depot Invoices
  depotInvoices(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/depotInvoicesReport`, data, httpOptions);
  }

  // Depot to Dealer Invoices
  dealerInvoices(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/dealerInvoicesReport`, data, httpOptions);
  }

  // Sale Return Invoices
  salesRetInvoices(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/ddepotInvoicesReport`, data, httpOptions);
  }

  // Depot Aging from Production
  agingFromProd(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/vehicleAging`, data, httpOptions);
  }

  getAgeProVariantList(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get(`${environment.url}/variant/getVariants`, httpOptions);
  }

  getAgeProModel(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get(`${environment.url}/variant/models`, httpOptions);
  }

  // Depot Aging from Received
  agingFromRec(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/vehicleAging`, data, httpOptions);
  }

  getAgeRecVariantList(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get(`${environment.url}/variant/getVariants`, httpOptions);
  }

  getAgeRecModel(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get(`${environment.url}/variant/models`, httpOptions);
  }
}
