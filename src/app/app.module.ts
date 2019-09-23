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
import { NoteDBService } from './service/NoteDB.service';
import { RegisterComponent } from './login/register.component';
import { ListNotesResolver } from './service/list-notes-resolve.service';
import { EditNoteResolver } from './service/edit-note-resolve.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'list'
    , component: ListNotesComponent
    , resolve: { noteList: ListNotesResolver }
  },
  {
    path: 'edit/:id',
    component: CreateNoteComponent,
    canDeactivate: [CreateNoteCanDeactivate],
    resolve: { note: EditNoteResolver }
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListNotesComponent,
    CreateNoteComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, CreateNoteCanDeactivate, NoteDBService, ListNotesResolver, EditNoteResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
