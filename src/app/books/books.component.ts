import { Component, OnInit } from '@angular/core';

import { BookHttpService} from '../book-http.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public allBook = [];

  constructor(public bookHttpService: BookHttpService) { }

  ngOnInit() {
    this.allBook = this.bookHttpService.getAllBook().subscribe(
      data =>{
        this.allBook = data;
        //this.allBook = data[0].authors;
      },
      error =>{
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

}
