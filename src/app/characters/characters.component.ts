import { Component, OnInit } from '@angular/core';
import { BookHttpService } from '../book-http.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  public allCharacters =[];

  constructor(public bookHttpService: BookHttpService) { }

  ngOnInit() {
    this.allCharacters = this.bookHttpService.getAllCharacters().subscribe(
      data =>{
        this.allCharacters = data;
        //this.allBook = data[0].authors;
      },
      error =>{
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

}
