import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addQuestion, iMessage, iQuestion } from './questions.model';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  //private questionsUrl = 'api/questions'
  private questionsdburl = 'http://localhost:8080/questions'
  constructor(private _httpclient:HttpClient) { }
  question$ = new Subject<iQuestion[]>()

  getallQuestions():Observable<iQuestion[]>{
    let token = localStorage.getItem('token') as string
    return this._httpclient.get<iQuestion[]>(this.questionsdburl, {
      headers:new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

  getquestionId(id:string):Observable<iQuestion>{
    let token = localStorage.getItem('token') as string
    return this._httpclient.get<iQuestion>(`${this.questionsdburl}/${id}`, 
    {
      headers:new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

  // append the url (queryType--or which way??)
  getquestionsEmail():Observable<iQuestion[]>{
    let token = localStorage.getItem('token') as string
    return this._httpclient.get<iQuestion[]>(``,
    {
      headers:new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }
 
  createquestion(question:addQuestion):Observable<iMessage>{
    let token = localStorage.getItem('token') as string
    return this._httpclient.post<iMessage>(this.questionsdburl,question, 
      {
        headers:new HttpHeaders().set('token',token)
      }).pipe(
      catchError(this.handlError)
    )
  }

  deleteQuestion(id:string):Observable<iMessage>{
    let token = localStorage.getItem('token') as string  
    return this._httpclient.delete<iMessage>(`${this.questionsdburl}/${id}`,
    {
      headers:new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

  updateQuestion(id:string, question:addQuestion):Observable<iQuestion> {
    let token = localStorage.getItem('token') as string
    return this._httpclient.put<iQuestion>(`${this.questionsdburl}/${id}`, question,
    {
      headers:new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

 

  private handlError({status}:HttpErrorResponse){
    return throwError(() => `${status}: somezing happened.. with questions db`)
  }
}
