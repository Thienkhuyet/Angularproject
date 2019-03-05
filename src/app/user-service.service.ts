import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/UserDetails';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private readonly URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}
  getUserDetile(): Observable<any> {
    return this.http.get<User>(this.URL);
  }
}
