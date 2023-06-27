import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addComments, iComments, iMessage } from '../questions/questions.model';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsdburl = 'http://localhost:8080/comments'
  constructor(private _httpclient:HttpClient) { }
  comments$ = new Subject<iComments[]>()

  getallComments():Observable<iComments[]> {
    return this._httpclient.get<iComments[]>(this.commentsdburl).pipe(
      catchError(this.handlError)
    )

  }
  getCommentsbyAnswer(id:string):Observable<iComments[]>{
    return this._httpclient.get<iComments[]>(`${this.commentsdburl + '/aid'}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  getcommentsById(id:string):Observable<iComments>{
    return this._httpclient.get<iComments>(`${this.commentsdburl + '/cid'}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  createcomments(comment:addComments):Observable<iMessage>{
    return this._httpclient.post<iMessage>(this.commentsdburl,comment).pipe(
      catchError(this.handlError)
    )
  }

  updatecomment(id:string, comment:addComments):Observable<iComments> {
    return this._httpclient.put<iComments>(`${this.commentsdburl}/${id}`, comment).pipe(
      catchError(this.handlError)
    )
  }

  

  private handlError({status}:HttpErrorResponse){
    return throwError(() => `${status}: somezing happened.. with comments db`)
  }
}






