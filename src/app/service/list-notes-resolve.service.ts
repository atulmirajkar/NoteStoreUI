import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Note } from "../model/NoteModel";
import { Observable } from "rxjs";
import { NoteDBService } from "./notedb-service";

@Injectable()
export class ListNotesResolver implements Resolve<Note[]> {
  _noteDB: NoteDBService;
  constructor(noteDB: NoteDBService) {
    this._noteDB = noteDB;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Note[]> {
    return this._noteDB.getAll();
  }

}
