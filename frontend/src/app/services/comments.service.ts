import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addComments, iComments, iMessage } from '../questions/questions.model';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsdburl = ''
  constructor(private _httpclient:HttpClient) { }
  comments$ = new Subject<iComments[]>()


  getallComments():Observable<iComments[]>{
    return this._httpclient.get<iComments[]>(this.commentsdburl).pipe(
      catchError(this.handlError)
    )
  }

  getcommentsId(id:string):Observable<iComments>{
    return this._httpclient.get<iComments>(`${this.commentsdburl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  createcomments(question:addComments):Observable<iMessage>{
    return this._httpclient.post<iMessage>(this.commentsdburl,question).pipe(
      catchError(this.handlError)
    )
  }

  updateQuestion(id:string, question:addComments):Observable<iComments> {
    return this._httpclient.put<iComments>(`${this.commentsdburl}/${id}`, question).pipe(
      catchError(this.handlError)
    )
  }

  deleteQuestion(id:string):Observable<iMessage>{
  
    return this._httpclient.delete<iMessage>(`${this.commentsdburl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  private handlError({status}:HttpErrorResponse){
    return throwError(() => `${status}: somezing happened.. with comments db`)
  }
}






