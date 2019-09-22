import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';
import { ListNotesComponent } from './notes/list-notes.component';
import { CreateNoteComponent } from './notes/create-note.component';
import { CreateNoteCanDeactivate } from './notes/create-note-can-deactivate.service';
import { CanDeactivate } from '@angular/router/src/utils/preactivation';
import { NoteDBService } from './service/NoteDB.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list', component: ListNotesComponent },
  { path: 'edit/:id',
    component: CreateNoteComponent,
    canDeactivate: [CreateNoteCanDeactivate]
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListNotesComponent,
    CreateNoteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, CreateNoteCanDeactivate, NoteDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
