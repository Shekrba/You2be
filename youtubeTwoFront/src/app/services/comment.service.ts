import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/comment"

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getTopLevelComments(videoId): Observable<any>{
    return this.http.get(`${BASE_URL}/${videoId}`);
  }

  getReplies(parentId): Observable<any>{
    return this.http.get(`${BASE_URL}/reply/${parentId}`);
  }

  addComment(comment): Observable<any>{
    return this.http.post(BASE_URL, comment,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  deleteComment(commentId): Observable<any>{
    return this.http.delete(BASE_URL+"/"+commentId,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }
}
