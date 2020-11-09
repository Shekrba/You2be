import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/video"

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  uploadVideo(file): Observable<any>{
    return this.http.post(`${BASE_URL}/upload`, file,{
      headers: new HttpHeaders({
      })
    });
  }

  addVideo(video): Observable<any>{
    return this.http.post(BASE_URL, video,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  editVideo(video): Observable<any>{
    return this.http.put(BASE_URL, video,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  getMyVideos(): Observable<any>{
    return this.http.get(`${BASE_URL}/my`);
  }

  getVideo(videoId): Observable<any>{
    return this.http.get(`${BASE_URL}/download/${videoId}`);
  }

  getAllVideos(): Observable<any>{
    return this.http.get(`${BASE_URL}`);
  }

  deleteVideo(videoId): Observable<any>{
    return this.http.delete(BASE_URL+"/"+videoId,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}
