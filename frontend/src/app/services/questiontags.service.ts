import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addQuesTag, iMessage, iQuesTag } from '../questions/questions.model';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestiontagsService {

  private questionstagurl = ''
  constructor(private _httpclient:HttpClient) { }
  questionstag$ = new Subject<iQuesTag[]>()


  getallComments():Observable<iQuesTag[]>{
    return this._httpclient.get<iQuesTag[]>(this.questionstagurl ).pipe(
      catchError(this.handlError)
    )
  }

  getcommentsId(id:string):Observable<iQuesTag>{
    return this._httpclient.get<iQuesTag>(`${this.questionstagurl }/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  createcomments(questiontag:addQuesTag):Observable<iMessage>{
    return this._httpclient.post<iMessage>(this.questionstagurl,questiontag).pipe(
      catchError(this.handlError)
    )
  }

  private handlError({status}:HttpErrorResponse){
    return throwError(() => `${status}: somezing happened.. with questionstag db`)
  }
}









