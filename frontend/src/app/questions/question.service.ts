import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from './questions.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  
  private questionsUrl = 'api/questions'
  constructor(private _httpclient:HttpClient) { }

  getallQuestions(){
    return this._httpclient.get<Question[]>(this.questionsUrl).pipe(
      catchError(this.handlError)
    )
  }

  getquestionId(id:number){
    return this._httpclient.get<Question>(`${this.questionsUrl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  createquestion({Title,Body,Tags}:Question):Observable<Question>{
    return this._httpclient.post<Question>(this.questionsUrl,{Title,Body,Tags}).pipe(
      catchError(this.handlError)
    )
  }

  updateQuestion(question:Question):Observable<Question> {
    return this._httpclient.put<Question>(this.questionsUrl, question).pipe(
      catchError(this.handlError)
    )
  }

  deleteQuestion(id:number):Observable<unknown>{
    const url = `${this.questionsUrl}/${id}`
    return this._httpclient.delete(url).pipe(
      catchError(this.handlError)
    )
  }

  private handlError({status}:HttpErrorResponse){
    return throwError(() => `${status}: somezing happened..`)
  }
}
