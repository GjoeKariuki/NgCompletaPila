import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addAnswerVotes, iAnswerVotes, iMessage } from '../questions/questions.model';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswervotesService {

  private answervotesdburl = ''
  constructor(private _httpClient:HttpClient) { }
  answervotes$ = new Subject<iAnswerVotes[]>()

  getallAnswervotes(): Observable<iAnswerVotes[]> {
    return this._httpClient.get<iAnswerVotes[]>(this.answervotesdburl).pipe(
      catchError(this.handlError)
    )
  }

  getanswervotesId(id:string): Observable<iAnswerVotes> {
    return this._httpClient.get<iAnswerVotes>(`${this.answervotesdburl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  createanswer(answer: addAnswerVotes): Observable<iMessage> {
    return this._httpClient.post<iMessage>(this.answervotesdburl, answer).pipe(
      catchError(this.handlError)
    )
  }

  updateAnswer(id: string, answer: addAnswerVotes): Observable<iAnswerVotes> {
    return this._httpClient.put<iAnswerVotes>(`${this.answervotesdburl}/${id}`, answer).pipe(
      catchError(this.handlError)
    )
  }

  deleteQuestion(id: string): Observable<iMessage> {
    return this._httpClient.delete<iMessage>(`${this.answervotesdburl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  private handlError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: somezing happened..`)
  }


}



export class AnswersService {

  
  constructor() { }
 

 

  

  

}





 




