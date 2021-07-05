import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  plantStock(data: any, header: any): Observable<any> {
    return this.http.post(`${environment.url}/vehicle/getVehicles`, data, header);
  }

  cStock(data: any, header: any): Observable<any> {
    return this.http.post(`${environment.url}/vehicle/getCVehicles`, data, header);
  }
}
