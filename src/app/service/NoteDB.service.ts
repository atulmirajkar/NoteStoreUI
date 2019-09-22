import { Injectable } from "@angular/core";
import { Note } from "../model/NoteModel";

@Injectable()
export class NoteDBService {
  public noteArr: Note[] = [{
    Id: "sfdgdg",
    Tag: "first post",
    Title: "dfs",
    Post: "dsf"
  }];

  constructor() {
    this.noteArr.push({
      Id: "sfdg",
      Tag: "first post",
      Title: "dfs",
      Post: "dsf"
    });

    this.noteArr.push({
      Id: "sfdg",
      Tag: "first post",
      Title: "second post",
      Post: "dsf"
    });
  }

  public add(note: Note) {
    this.noteArr.push(note);
  }

  public get(id: string): Note {
    return this.noteArr.find(note => note.Id === id);
  }

  public update(id: string, updatedNote: Note): Note {
    const noteToUpdate = this.noteArr.find(note => note.Id === id);
    const index = this.noteArr.indexOf(noteToUpdate);
    this.noteArr[index] = Object.assign({}, updatedNote);
    return this.noteArr[index];

  }
}
