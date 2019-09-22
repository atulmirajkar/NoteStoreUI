import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from '../model/NoteModel';
import { NgForm } from '@angular/forms';
import { NoteDBService } from '../service/NoteDB.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  public note: Note;

  @ViewChild('createForm') public createNoteForm: NgForm;
  private _noteDB: NoteDBService;
  private _router: Router;
  private _activatedRoute: ActivatedRoute;
  private _currentId: string;

  constructor(noteDB: NoteDBService, router: Router, activatedRoute: ActivatedRoute) {
    this._noteDB = noteDB;
    this._router = router;
    this._activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(paramMap => {
      this._currentId = paramMap.get('id');
      this.getNote(this._currentId);
    });
  }

  private getNote(id: string) {
    if (id === "-1") {
      this.note = {
        Id: null,
        Title: null,
        Tag: null,
        Post: null
      };
    } else {
      this.note = Object.assign({}, this._noteDB.get(id));
    }
  }

  onSave(note: Note) {
    console.log(note);
    const newNote: Note = Object.assign({}, note);
    if (this._currentId === '-1') {
      this._noteDB.add(newNote);
    } else {
      this._noteDB.update(this._currentId, newNote);
    }
    this.createNoteForm.reset();
    this._router.navigate(['list']);
  }
}
