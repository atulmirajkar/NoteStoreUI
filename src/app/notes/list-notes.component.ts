import { Component, OnInit } from '@angular/core';
import { Note } from '../model/NoteModel';
import { NoteDBService } from '../service/NoteDB.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ErrorHandler } from '../Utils/ErrorHandling';
import { catchError } from 'rxjs/operators';

@Component({
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements OnInit {
  private _authService: AuthService;
  private _activatedRoute: ActivatedRoute;
  private _noteDB: NoteDBService;
  noteArr: Note[];
  private _router: Router;

  constructor(authservice: AuthService, noteDB: NoteDBService, router: Router, activatedRoute: ActivatedRoute) {
    this._authService = authservice;
    this._noteDB = noteDB;
    this.noteArr = this._noteDB.noteArr;
    this._router = router;
    this._activatedRoute = activatedRoute;

    this.noteArr = this._activatedRoute.snapshot.data['noteList'];
    this._noteDB.noteArr = this.noteArr;
  }

  ngOnInit() {
  }

  editNote(id: string) {
    this._router.navigate(['edit', id]);
  }
}
