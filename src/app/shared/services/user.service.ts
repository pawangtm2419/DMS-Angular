import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from './toster.service';
import { map } from 'rxjs/operators';


export interface Users {
  empID: String;
  pass: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router, public toaster: ToasterService) {}

  userUogIn(data: Users) : Observable<any> {
    return this.http.post(`${environment.url}/authLog`, data).pipe(map(res => {
        return res;
      })
    );
  }

  gettoken() {
    return (!!localStorage.getItem("profile") && !!localStorage.getItem("token"));
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.clear();
    this.toaster.showSuccess("Success", "Log out successfull");
    this.router.navigate(['/']);
  }

}
