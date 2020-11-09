import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/user"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile(userId): Observable<any>{
    return this.http.get(`${BASE_URL}/${userId}`);
  }

  upload(file): Observable<any>{
    return this.http.post(`${BASE_URL}/image/upload`, file,{
      headers: new HttpHeaders({
      })
    });
  }

  editProfile(user): Observable<any>{
    return this.http.put(BASE_URL, user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}
