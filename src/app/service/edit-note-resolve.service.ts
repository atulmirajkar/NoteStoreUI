import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Note } from "../model/NoteModel";
import { Observable, of } from "rxjs";
import { NoteDBService } from "./notedb-service";
import { Injectable } from "@angular/core";

@Injectable()
export class EditNoteResolver implements Resolve<Note> {
  _noteDB: NoteDBService;
  constructor(noteDB: NoteDBService) {
    this._noteDB = noteDB;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Note> {
    if (route.paramMap.get('id') === '-1') {
      return of({
        id: null,
        title: null,
        tag: null,
        post: null
      });
    } else {

    return this._noteDB.get(route.paramMap.get('id'));
    }
  }

}
