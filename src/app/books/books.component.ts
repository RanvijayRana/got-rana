import { Component, OnInit } from '@angular/core';

import { BookHttpService} from '../book-http.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public allBook = [];
  public bookPageNumber: number = 1;

  constructor(public bookHttpService: BookHttpService) { }

  ngOnInit() {
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data =>{
        this.allBook = data;
        //this.allBook = data[0].authors;
      },
      error =>{
        if(error = 'ERR_INTERNET_DISCONNECTED'){
          alert("Not connected to Internet, check your connection please");  
        }
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  bookNextPageCounter() {
    this.bookPageNumber++;
    console.log(this.bookPageNumber);
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data =>{
        
        
        this.allBook = data;
        console.log(data);
        console.log("hellllloooo");
        if(data.length = 0){
          this.bookPageNumber--;
          alert("data not found");
        }
        else{
          this.allBook = data;
        console.log(data);
        console.log("hellllloooo");
        }
        //this.allBook = data[0].authors;
      },
      error =>{
        if(error = 'ERR_INTERNET_DISCONNECTED'){
          alert("Not connected to Internet, check your connection please");  
        }
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  bookPrevPageCounter() {
    this.bookPageNumber--;
    console.log(this.bookPageNumber);
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data =>{
        
        this.allBook = data;
        console.log(data);
        if(data.length = 0){
          this.bookPageNumber++;
          alert("data not found");
        }
        //this.allBook = data[0].authors;
      },
      error =>{
        if(error = 'ERR_INTERNET_DISCONNECTED'){
          alert("Not connected to Internet, check your connection please");  
        }
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

}
