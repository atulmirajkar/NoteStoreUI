import { Injectable } from "@angular/core";
import { Note } from "../model/NoteModel";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Token } from "../model/Token";
import { catchError } from "rxjs/operators";
import { ErrorHandler } from "../Utils/ErrorHandling";

@Injectable()
export class NoteDBService {
  public noteArr: Note[];
  private _httpClient: HttpClient;
  private readonly _endPoint = 'https://localhost:5001/api/v1/notes';
  private readonly _headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getAll(): Observable<Note[]> {
    const headerWithToken = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this._httpClient.get<Note[]>(this._endPoint, { headers: headerWithToken });

  }

  public add(note: Note): Observable<Note> {
    const headerWithToken = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this._httpClient.post<Note>(this._endPoint, note, { headers: headerWithToken });

  }

  public get(id: string): Observable<Note> {
    const headerWithToken = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this._httpClient.get<Note>(this._endPoint + '/' + id, { headers: headerWithToken });
  }

  public update(id: string, updatedNote: Note): Observable<Note> {
    const headerWithToken = this._headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this._httpClient.put<Note>(this._endPoint + '/' + id, updatedNote, { headers: headerWithToken });
  }
}
