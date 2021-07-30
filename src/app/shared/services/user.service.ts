import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from './toster.service';
import { map } from 'rxjs/operators';
import { User } from '../model';

export interface Users {
  empID: String;
  pass: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public sub = new BehaviorSubject<Boolean>(false);
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private http: HttpClient, private router: Router, public toaster: ToasterService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token') || '{}'));
    this.user = this.userSubject.asObservable();
  }

  userUogIn(data: Users): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.post(`${environment.url}/authLog`, data, httpOptions).pipe(map(userData => {
      localStorage.setItem('user', JSON.stringify(userData));
      this.userSubject.next(userData);
      return userData;
    }));
  }

  gettoken() {
    return (!!localStorage.getItem("profile") && !!localStorage.getItem("token"));
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.clear();
    this.toaster.showSuccess("Success", "Log out successfull");
    this.router.navigate(['/']);
  }

}
