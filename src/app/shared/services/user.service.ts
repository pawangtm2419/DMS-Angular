import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from './toster.service';
import { map } from 'rxjs/operators';
import { User } from '../model';
import { CookieService } from 'ngx-cookie-service';

export interface Users {
  empID: string;
  pass: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http: HttpClient, private router: Router, public toaster: ToasterService, private cookie: CookieService) {
    this.userSubject = new BehaviorSubject<any>(this.cookie.get('token'));
    this.user = this.userSubject.asObservable();
  }

  userUogIn(data: Users): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post(`${environment._url}/authLog`, data, httpOptions).pipe(map(userData => {
      localStorage.setItem('user', JSON.stringify(userData));
      this.userSubject.next(userData);
      return userData;
    }));
  }

  gettoken() {
    return (!!localStorage.getItem('user') && !!this.cookie.get('token'));
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  logout(): void{
    localStorage.removeItem('profile');
    this.cookie.delete('token');
    localStorage.clear();
    this.userSubject.next(null);
    this.cookie.deleteAll();
    this.toaster.showSuccess('Success', 'Log out successfull');
    this.router.navigate(['/']);
  }

  getRoleData(role: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/role`, role, httpOptions);
  }

  updateRole(role: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this.cookie.get('token')}) };
    return this.http.post(`${environment._url}/updateRoles`, role, httpOptions);
  }
}
