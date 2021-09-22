import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
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
  constructor(private _http: HttpClient, private router: Router, public toaster: ToasterService, private _cookie: CookieService) {
    this.userSubject = new BehaviorSubject<any>(this._cookie.get('token'));
    this.user = this.userSubject.asObservable();
  }
  userUogIn(data: Users): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/authLog`, data, httpOptions).pipe(map((userData: any) => {
      if(userData.status) {
        localStorage.setItem('user', JSON.stringify(userData));
        this.userSubject.next(userData);
        return userData;
      } else {
        return '';
      }
    }));
  }
  gettoken() {
    return (!!localStorage.getItem('user') && !!this._cookie.get('token'));
  }
  public get userValue(): User {
    return this.userSubject.value;
  }
  logout(): void{
    localStorage.removeItem('profile');
    this._cookie.delete('token');
    localStorage.clear();
    this.userSubject.next(null);
    this._cookie.deleteAll();
    this.toaster.showSuccess('Success', 'Log out successfull');
    this.router.navigate(['/']);
  }
  getRoleData(role: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/role`, role, httpOptions);
  }
  updateRole(role: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/updateRoles`, role, httpOptions);
  }
  updateUser(user: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.post<any[]>(`${environment._url}/updateUser`, user, httpOptions);
  }
  changePassword(user: any): Observable<any[]> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', token: this._cookie.get('token'), companyCode: environment.companyCode}) };
    return this._http.get<any[]>(`${environment._url}/changePassword?id=${user.id}&newPassword=${user.newPassword}&oldPassword=${user.oldPassword}`, httpOptions);
  }
}
