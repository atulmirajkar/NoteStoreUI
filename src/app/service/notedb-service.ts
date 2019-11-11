import { Injectable } from "@angular/core";
import { Note } from "../model/NoteModel";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "../model/Token";
import { catchError } from "rxjs/operators";
import { ErrorHandler } from "../Utils/ErrorHandling";
import { environment } from '../../environments/environment';

@Injectable()
export class NoteDBService {
  public noteArr: Note[];
  private _httpClient: HttpClient;
  private readonly _endPoint =  environment.baseURL + 'api/v1/notes';
  private readonly _headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getAll(): Observable<Note[]> {
    return this._httpClient.get<Note[]>(this._endPoint, { headers: this._headers });

  }

  public add(note: Note): Observable<Note> {
    return this._httpClient.post<Note>(this._endPoint, note, { headers: this._headers });

  }

  public get(id: string): Observable<Note> {
    return this._httpClient.get<Note>(this._endPoint + '/' + id, { headers: this._headers });
  }

  public update(id: string, updatedNote: Note): Observable<Note> {
    return this._httpClient.put<Note>(this._endPoint + '/' + id, updatedNote, { headers: this._headers });
  }

  public delete(id: string) {
    return this._httpClient.delete(this._endPoint + '/' + id, {headers: this._headers});
  }
}
