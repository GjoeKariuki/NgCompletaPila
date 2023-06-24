import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    return this._httpclient.get<iQuestion[]>(this.questionsdburl).pipe(
      catchError(this.handlError)
    )
  }

  getquestionId(id:string):Observable<iQuestion>{
    return this._httpclient.get<iQuestion>(`${this.questionsdburl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }
 
  createquestion(question:addQuestion):Observable<iMessage>{
    return this._httpclient.post<iMessage>(this.questionsdburl,question).pipe(
      catchError(this.handlError)
    )
  }

  updateQuestion(id:string, question:addQuestion):Observable<iQuestion> {
    return this._httpclient.put<iQuestion>(`${this.questionsdburl}/${id}`, question).pipe(
      catchError(this.handlError)
    )
  }

  deleteQuestion(id:string):Observable<iMessage>{
  
    return this._httpclient.delete<iMessage>(`${this.questionsdburl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  private handlError({status}:HttpErrorResponse){
    return throwError(() => `${status}: somezing happened..`)
  }
}
