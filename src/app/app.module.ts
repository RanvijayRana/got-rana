import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { HousesComponent } from './houses/houses.component';
import { CharactersComponent } from './characters/characters.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { HouseDetailsComponent } from './house-details/house-details.component';

import { RouterModule,Routes} from '@angular/router';
import { BookHttpService } from './book-http.service';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HousesComponent,
    CharactersComponent,
    BookDetailsComponent,
    CharacterDetailsComponent,
    HouseDetailsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'books',component:BooksComponent},
      {path:'houses',component:HousesComponent},
      {path:'characters',component:CharactersComponent},
      {path:'bookDetails/:bookUrl',component:BookDetailsComponent},
      {path:'characterDetails/:bookUrl',component:CharacterDetailsComponent},
      {path:'houseDetails/:bookUrl',component:HouseDetailsComponent}
    ])    
  ],
  providers: [BookHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
