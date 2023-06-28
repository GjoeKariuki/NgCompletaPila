import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addTag, iMessage, iTag } from '../questions/questions.model';
import { Observable, Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private tagsdburl = 'http://localhost:8080/tags'
  constructor(private _httpClient:HttpClient) { }
  tags$ = new Subject<iTag[]>()

  getallTags(): Observable<iTag[]> {
    let token = localStorage.getItem('token') as string
    return this._httpClient.get<iTag[]>(this.tagsdburl, {
      headers: new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

  gettagsbyQid(id:string):Observable<iTag[]> {
    let token = localStorage.getItem('token') as string
    return this._httpClient.get<iTag[]>(`${this.tagsdburl + '/qid'}/${id}`, {
      headers: new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

  getagById(id:string): Observable<iTag> {
    let token = localStorage.getItem('token') as string
    return this._httpClient.get<iTag>(`${this.tagsdburl}/${id}`,{
      headers: new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

  createTag(tag: addTag): Observable<iMessage> {
    let token = localStorage.getItem('token') as string
    return this._httpClient.post<iMessage>(this.tagsdburl, tag,{
      headers: new HttpHeaders().set('token',token)
    }).pipe(
      catchError(this.handlError)
    )
  }

  private handlError({ status }: HttpErrorResponse) {
    return throwError(() => `${status}: somezing happened.. fetching tags db`)
  }


}
 




 




