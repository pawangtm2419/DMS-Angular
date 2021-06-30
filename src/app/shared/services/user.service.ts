import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from './toster.service';

export interface User {
  empID: String;
  pass: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, public toaster: ToasterService) { }

  userUogIn(data: User): Observable<any> {
    return this.http.post(`${environment.url}/authLog`, data);
  }

  gettoken() {
    return !!localStorage.getItem("profile");
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.clear();
    this.toaster.showSuccess("Success", "Log out successfull");
    this.router.navigate(['/']);
  }
}
