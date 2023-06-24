import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addAnswer, iAnswer, iMessage } from '../questions/questions.model';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private answersdburl = ''
  constructor(private _httpClient:HttpClient) { }
  answer$ = new Subject<iAnswer[]>()

  getallAnswers(): Observable<iAnswer[]> {
    return this._httpClient.get<iAnswer[]>(this.answersdburl).pipe(
      catchError(this.handlError)
    )
  }

  getanswerId(id:string): Observable<iAnswer> {
    return this._httpClient.get<iAnswer>(`${this.answersdburl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  createanswer(answer: addAnswer): Observable<iMessage> {
    return this._httpClient.post<iMessage>(this.answersdburl, answer).pipe(
      catchError(this.handlError)
    )
  }

  updateAnswer(id: string, answer: addAnswer): Observable<iAnswer> {
    return this._httpClient.put<iAnswer>(`${this.answersdburl}/${id}`, answer).pipe(
      catchError(this.handlError)
    )
  }

  
  deleteQuestion(id: string): Observable<iMessage> {
    return this._httpClient.delete<iMessage>(`${this.answersdburl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  private handlError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: somezing happened.. with answers db`)
  }

}





 




