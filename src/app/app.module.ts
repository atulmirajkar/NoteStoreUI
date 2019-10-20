import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './service/auth.service';
import { ListNotesComponent } from './notes/list-notes.component';
import { CreateNoteComponent } from './notes/create-note.component';
import { CreateNoteCanDeactivate } from './service/create-note-can-deactivate.service';
import { NoteDBService } from './service/notedb-service';
import { RegisterComponent } from './login/register.component';
import { ListNotesResolver } from './service/list-notes-resolve.service';
import { EditNoteResolver } from './service/edit-note-resolve.service';
import { ViewNoteComponent } from './notes/view-note.component';
import { ViewNoteResolver } from './service/view-note-resolve.service';
import { TokenInterceptor } from './service/token.Interceptor';
import { CanActivateGuard } from './service/can-activate.service';
import { PageNotFoundComponent } from './notes/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'list'
    , component: ListNotesComponent
    , resolve: { noteList: ListNotesResolver }
    , canActivate: [CanActivateGuard]
  },
  {
    path: 'edit/:id',
    component: CreateNoteComponent,
    canDeactivate: [CreateNoteCanDeactivate],
    resolve: { note: EditNoteResolver }
    , canActivate: [CanActivateGuard]
  },
  {
    path: 'view/:id',
    component: ViewNoteComponent,
    resolve: { viewNote: ViewNoteResolver }
    , canActivate: [CanActivateGuard]
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListNotesComponent,
    CreateNoteComponent,
    RegisterComponent,
    ViewNoteComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService
    , CreateNoteCanDeactivate
    , NoteDBService
    , ListNotesResolver
    , EditNoteResolver
    , ViewNoteResolver
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
    , CanActivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
