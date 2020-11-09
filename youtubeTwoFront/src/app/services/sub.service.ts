import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/sub"

@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor(private http: HttpClient) { }

  subscribe(channelId): Observable<any>{
    return this.http.post(`${BASE_URL}/${channelId}`, null,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  unsubscribe(channelId): Observable<any>{
    return this.http.delete(`${BASE_URL}/${channelId}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  checkIfAlreadySubscribed(channelId): Observable<any>{
    return this.http.get(`${BASE_URL}/check/${channelId}`);
  }

  checkIfAlreadySubscribedGroup(channels): Observable<any>{
    return this.http.post(`${BASE_URL}/check`, channels,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  getSubscriptions(): Observable<any>{
    return this.http.get(BASE_URL);
  }
}
