import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/search"

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchVideosAndChannels(query): Observable<any>{
    return this.http.get(`${BASE_URL}/${query}`);
  }
}
