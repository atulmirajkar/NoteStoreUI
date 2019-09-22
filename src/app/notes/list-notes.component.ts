import { Component, OnInit } from '@angular/core';
import { Note } from '../model/NoteModel';
import { NoteDBService } from '../service/NoteDB.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements OnInit {
  private _noteDB: NoteDBService;
  noteArr: Note[];
  private _router: Router;

  constructor(noteDB: NoteDBService, router: Router) {
    this._noteDB = noteDB;
    this.noteArr = this._noteDB.noteArr;
    this._router = router;
  }

  ngOnInit() {
  }

  editNote(id: string) {
    this._router.navigate(['edit',  id]);
  }
}
