import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(private _http: HttpClient, private _cookie: CookieService) { }

  getFilteredDepotStock(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/getFilteredDepotStock`, data, httpOptions);
  }

  // Depot Stock Variant Wise
  depotVariant(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/getVehiclesByVariant`, data, httpOptions);
  }

  // Depot to Depot Invoices
  depotInvoices(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/depotInvoicesReport`, data, httpOptions);
  }

  // Depot to Dealer Invoices
  dealerInvoices(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/dealerInvoicesReport`, data, httpOptions);
  }

  // Sale Return Invoices
  salesRetInvoices(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/ddepotInvoicesReport`, data, httpOptions);
  }

  // Depot Aging from Production
  agingFromProd(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/vehicleAging`, data, httpOptions);
  }

  // Depot Aging from Received
  agingFromRec(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/vehicleAging`, data, httpOptions);
  }

  getAgeRecVariantList(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.get<any[]>(`${environment._url}/variant/getVariants`, httpOptions);
  }

  getAgeRecModel(): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.get<any[]>(`${environment._url}/variant/models`, httpOptions);
  }

  viewVehicle(data: any): Observable<any[]> {
    const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')});
    return this._http.get<any[]>(`${environment._url}/vehicle/getStockForSTN`, { params: data, headers: httpOptions });
  }

  updateVehicleDetails(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token')})};
    return this._http.post<any[]>(`${environment._url}/vehicle/updateVehicleDetails`, data, httpOptions);
  }

  // /vehicle/checkInvoiceNumber
  checkInvoiceNumber(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/vehicle/checkInvoiceNumber`, data, httpOptions);
  }

  dealerInvoiceDetails(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.get<any[]>(`${environment._url}/dealer/dealerDetails/${data}`, httpOptions);
  }

  getDepotByUser(data: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.get<any[]>(`${environment._url}/depot/depotByUser?depotCreatedBy=${data}`, httpOptions);
  }
}
