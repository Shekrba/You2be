import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/liking"

@Injectable({
  providedIn: 'root'
})
export class LikingService {

  constructor(private http: HttpClient) { }

  makeLiking(body): Observable<any>{
    return this.http.post(BASE_URL, body,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  deleteLiking(videoId): Observable<any>{
    return this.http.delete(`${BASE_URL}/${videoId}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  checkLiking(videoId): Observable<any>{
    return this.http.get(`${BASE_URL}/check/${videoId}`);
  }
}
