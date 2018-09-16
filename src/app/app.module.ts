import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { HousesComponent } from './houses/houses.component';
import { CharactersComponent } from './characters/characters.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BookDetailsComponent } from './book-details/book-details.component';

import { RouterModule,Routes} from '@angular/router';
import { BookHttpService } from './book-http.service';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HousesComponent,
    CharactersComponent,
    PageNotFoundComponent,
    BookDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([
      {path:'books',component:BooksComponent},
      {path:'houses',component:HousesComponent},
      {path:'characters',component:CharactersComponent},
      {path:'page',component:PageNotFoundComponent},
      {path:'bookDetails/:bookUrl',component:BookDetailsComponent}
    ])
  ],
  providers: [BookHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
