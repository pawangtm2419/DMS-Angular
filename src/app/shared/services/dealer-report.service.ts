import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DealerReportService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  // Dealer stock
  getStocks(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/vehicle/getVehicles`, data, httpOptions);
  }
  // Dealer Stock Variantwise
  getStocksVarWise(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/vehicle/getVehiclesByVariant`, data, httpOptions);
  }
  // Dealer Collection MTD
  getCollectionMtd(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/dealerCollection/getDealerMTD`, data, httpOptions);
  }
  // Dealer Collection Daywise
  getCollectionDaywise(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/dealerCollection/getDaywiseCollection`, data, httpOptions);
  }
  // ATS Reports
  getAtsReports(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/ats/ATSDetails`, data, httpOptions);
  }
  // RTS Reports
  getRtsReports(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/ats/ATSDetails`, data, httpOptions);
  }
  // Delivery Reports
  getDelReports(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/ats/deliveries`, data, httpOptions);
  }
  // Retail Reports
  getretailReports(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/ats/retails`, data, httpOptions);
  }
  // Advance report
  getAdvReports(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/ats/atsReport`, data, httpOptions);
  }
  // BG/SD Monitoring
  getBdSdMonitor(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/bgs/getBGs?path=monitor`,  httpOptions);
  }
  // Old Tractor Reports
  getOldTractReports(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/vehicle/oldTractorReport`, data, httpOptions);
  }
  // Tehsil Report
  getTehsilReports(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/vehicle/tehsilReport`, data, httpOptions);
  }
  // Expected Disbursement Report
  getExpDisbReport(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/vehicle/disbursementReport`, data, httpOptions);
  }
  // Dealer Aging from Production
  getAgingProd(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/vehicle/vehicleAging`, data, httpOptions);
  }
  // Dealer Aging from Received
  getAgingRec(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/vehicle/vehicleAging`, data, httpOptions);
  }
}
