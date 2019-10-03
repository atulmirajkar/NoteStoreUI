import { Component, OnInit } from '@angular/core';
import { Note } from '../model/NoteModel';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteDBService } from '../service/NoteDB.service';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from '../Utils/ErrorHandling';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.scss']
})
export class ViewNoteComponent implements OnInit {
  public viewNote: Note;

  _currentId: string;
  _route: ActivatedRoute;
  _noteDB: NoteDBService;
  _router: Router;

  constructor(route: ActivatedRoute, noteDB: NoteDBService, router: Router) {
    this._route = route;
    this._noteDB = noteDB;
    this._router = router;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(paramMap => {
      this._currentId = paramMap.get('id');
      this.getNote(this._currentId);
    });
  }

  getNote(id: string) {
    this.viewNote = this._route.snapshot.data['viewNote'];
  }

  editNote(id: string) {
    this._router.navigate(['edit', id]);
  }

  deleteNote(id: string) {
    this._noteDB.delete(id)
      .pipe(catchError(ErrorHandler.handle))
      .subscribe(() => {
        const indexToDelete = this._noteDB.noteArr.findIndex(xx => xx.id === id);
        this._noteDB.noteArr = this._noteDB.noteArr.splice(indexToDelete);
        this._router.navigate(['list']);
      });
  }
}
