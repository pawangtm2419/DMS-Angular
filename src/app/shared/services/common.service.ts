import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http: HttpClient, private cookie: CookieService) { }

  getVehicleDetails(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.post(`${environment._url}/vehicle/getVehicles`, data, httpOptions);
  }

  viewDepot(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get(`${environment._url}/viewDepo`, httpOptions);
  }

  getModel(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get(`${environment._url}/variant/models`, httpOptions);
  }

  depotLocationFilter(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get<any>(`${environment._url}/viewDepo`, httpOptions);
  }

  getVariant(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get<any>(`${environment._url}/variant/getVariants`, httpOptions);
  }

  vehicleHist(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.post(`${environment._url}/vehicle/getVehicleHistory`, data, httpOptions);
  }

  histReports(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.post(`${environment._url}/report/searchReport`, data, httpOptions);
  }
  getVehHistory(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.post(`${environment._url}/report/getVehicleHistory`, data, httpOptions);
  }
  getZones(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get<any>(`${environment._url}/zones`, httpOptions);
  }
  getStatesByZone(zoneCode: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get<any>(`${environment._url}/getStatesByZone?zoneCode=${zoneCode}`, httpOptions);
  }

  getState(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get<any>(`${environment._url}/getStates`, httpOptions);
  }

  getTransport(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get<any>(`${environment._url}/viewTransporter`, httpOptions);
  }

  getDriver(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get<any>(`${environment._url}/viewOnPower`, httpOptions);
  }

  getDealerList(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get<any>(`${environment._url}/dealer/dealer/state/${data}`, httpOptions);
  }
  getvehInsurance(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.post(`${environment._url}/ats/ATSDetails`, data, httpOptions);
  }

  getBankCategories(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this._http.get<any>(`${environment._url}/financial/getBankCategories`, httpOptions);
  }
}
