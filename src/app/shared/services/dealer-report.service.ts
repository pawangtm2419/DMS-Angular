import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealerReportService {

  constructor(private http: HttpClient) { }
  // Dealer stock
  getStocks(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/getVehicles`, data, httpOptions)
  }
  // Dealer Stock Variantwise
  getStocksVarWise(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/getVehiclesByVariant`, data, httpOptions)
  }
  // Dealer Collection MTD
  getCollectionMtd(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/dealerCollection/getDealerMTD`, data, httpOptions)
  }
  // Dealer Collection Daywise
  getCollectionDaywise(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/dealerCollection/getDaywiseCollection`, data, httpOptions)
  }
  // ATS Reports
  getAtsReports(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/ats/ATSDetails`, data, httpOptions)
  }
  // RTS Reports
  getRtsReports(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/ats/ATSDetails`, data, httpOptions)
  }
  // Delivery Reports
  getDelReports(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/ats/deliveries`, data, httpOptions)
  }
  // Retail Reports
  getretailReports(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/ats/retails`, data, httpOptions)
  }
  // Advance report
  getAdvReports(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/ats/atsReport`, data, httpOptions)
  }
  // BG/SD Monitoring
  getBdSdMonitor(): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get(`${environment.url}/bgs/getBGs?path=monitor`,  httpOptions)
  }
  // Old Tractor Reports
  getOldTractReports(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/oldTractorReport`, data, httpOptions)
  }
  // Tehsil Report
  getTehsilReports(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/tehsilReport`, data, httpOptions)
  }
  // Expected Disbursement Report
  getExpDisbReport(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/disbursementReport`, data, httpOptions)
  }
  // Dealer Aging from Production
  getAgingProd(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/vehicleAging`, data, httpOptions)
  }
  // Dealer Aging from Received
  getAgingRec(data: any): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment.url}/vehicle/vehicleAging`, data, httpOptions)
  }
}
