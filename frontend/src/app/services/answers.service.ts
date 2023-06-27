import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addAnswer, iAnswer, iMessage } from '../questions/questions.model';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {

  private answersdburl = 'http://localhost:8080/answers'
  constructor(private _httpClient:HttpClient) { }
  answer$ = new Subject<iAnswer[]>()

  getallAnswers(): Observable<iAnswer[]> {
    let token = localStorage.getItem('token') as string
    return this._httpClient.get<iAnswer[]>(this.answersdburl,
      {
        headers: new HttpHeaders().set('token',token)
      }).pipe(
      catchError(this.handlError)
    )
  }

  getanswerbyaId(id:string): Observable<iAnswer> {
    let token = localStorage.getItem('token') as string
    return this._httpClient.get<iAnswer>(`${this.answersdburl+'/aid'}/${id}`,
    {
      headers: new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

  getanswerbyqId(id:string): Observable<iAnswer[]> {
    let token = localStorage.getItem('token') as string
    return this._httpClient.get<iAnswer[]>(`${this.answersdburl+'/qid'}/${id}`,
    {
      headers: new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }
  createanswer(answer: addAnswer): Observable<iMessage> {
    let token = localStorage.getItem('token') as string
    return this._httpClient.post<iMessage>(this.answersdburl, answer,
      {
        headers: new HttpHeaders().set('token',token)
      }).pipe(
      catchError(this.handlError)
    )
  }

  updateAnswer(id: string, answer: addAnswer): Observable<iAnswer> {
    let token = localStorage.getItem('token') as string
    return this._httpClient.put<iAnswer>(`${this.answersdburl}/${id}`, answer,{
      headers: new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

  

  private handlError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: somezing happened.. with answers db`)
  }

}





 




