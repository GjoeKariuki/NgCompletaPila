import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addTag, iMessage, iTag } from '../questions/questions.model';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private tagsdburl = ''
  constructor(private _httpClient:HttpClient) { }
  answer$ = new Subject<iTag[]>()

  getallTags(): Observable<iTag[]> {
    return this._httpClient.get<iTag[]>(this.tagsdburl).pipe(
      catchError(this.handlError)
    )
  }

  getanswerId(id:string): Observable<iTag> {
    return this._httpClient.get<iTag>(`${this.tagsdburl}/${id}`).pipe(
      catchError(this.handlError)
    )
  }

  createanswer(answer: addTag): Observable<iMessage> {
    return this._httpClient.post<iMessage>(this.tagsdburl, answer).pipe(
      catchError(this.handlError)
    )
  }

  private handlError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: somezing happened.. fetching tags db`)
  }


}
 




 




