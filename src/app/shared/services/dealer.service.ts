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

  constructor(private http: HttpClient, private cookie: CookieService) { }

  invoiceReport(data: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post<Invoice>(`${environment._url}/vehicle/dealerInvoicesReport`, data, httpOptions);
  }

}
