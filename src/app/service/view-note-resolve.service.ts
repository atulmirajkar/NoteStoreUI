import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Note } from "../model/NoteModel";
import { Observable } from "rxjs";
import { NoteDBService } from "./NoteDB.service";

@Injectable()
export class ViewNoteResolver implements Resolve<Note>{
  _noteDB: NoteDBService;
  constructor(noteDB: NoteDBService) {
    this._noteDB = noteDB;
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Note>  {
    return this._noteDB.get(route.paramMap.get('id'));
  }

}
