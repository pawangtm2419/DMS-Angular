import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private cookie: CookieService) { }

  viewDepot(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/viewDepo`, httpOptions);
  }

  getModel(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get(`${environment._url}/variant/models`, httpOptions);
  }

  depotLocationFilter(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.get<any>(`${environment._url}/viewDepo`, httpOptions);
  }

  getVariant(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get<any>(`${environment._url}/variant/getVariants`, httpOptions);
  }

  vehicleHist(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.post(`${environment._url}/vehicle/getVehicleHistory`, data, httpOptions);
  }

  getZones(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get<any>(`${environment._url}/zones`, httpOptions);
  }
  // /getStatesByZone?zoneCode=ZONE3
  getStatesByZone(zoneCode: string): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: JSON.parse(localStorage.getItem('token') || '{}')}) };
    return this.http.get<any>(`${environment._url}/getStatesByZone?zoneCode=${zoneCode}`, httpOptions);
  }
}
