import { CanDeactivate } from '@angular/router';
import { CreateNoteComponent } from '../notes/create-note.component';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateNoteCanDeactivate implements CanDeactivate<CreateNoteComponent> {
  canDeactivate(component: CreateNoteComponent): boolean {
    if (component.createNoteForm.dirty) {
      return confirm('Are you sure you want to discard your changes?');
    } else {
      return true;

    }
  }

}
