import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Invoice } from '../model/dealer';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private _http: HttpClient, private _cookie: CookieService) { }

  invoiceReport(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')}) };
    return this._http.post<Invoice[]>(`${environment._url}/vehicle/dealerInvoicesReport`, data, httpOptions);
  }
  getvehInsurance(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')}) };
    return this._http.post<any[]>(`${environment._url}/ats/ATSDetails`, data, httpOptions);
  }
  getTransactionClose(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')}) };
    return this._http.post<any[]>(`${environment._url}/systemSetting/getTransactionClose`, data, httpOptions);
  }
  getCustomerByDealer(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')}) };
    return this._http.get<any[]>(`${environment._url}/customer/customersByDealer?dealerCode=${data}`, httpOptions);
  }
  updateVehicleDetails(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/updateVehicleDetails`, data, httpOptions);
  }
  getFinancialInstitutionsList(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')}) };
    return this._http.get<any[]>(`${environment._url}/financial/getFinancialInstitutionsList?category=${data}`, httpOptions);
  }
  getPayments(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')}) };
    return this._http.post<any[]>(`${environment._url}/customer/payments`, data, httpOptions);
  }
  savePayment(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/customerPayment`, data, httpOptions);
  }
  saveRetail(data: any) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/retailVehicle`, data, httpOptions);
  }
}
