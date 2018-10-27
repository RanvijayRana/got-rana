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
  public maxPage: number;

  constructor(public bookHttpService: BookHttpService) { }

  ngOnInit() {

    

    if(12%6 == 0){
      this.maxPage = 12/6;  
    }
    else{
      this.maxPage = 12/6 + 1;
    }
    

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
      }/*,
      beforeSend =>
      {
        (".loader").css("display","flex");
      },
      complete =>
      {
         (".loader").css("display","none");
      }*/
    )
  }

  bookNextPageCounter() {
    this.bookPageNumber++;
    console.log(this.bookPageNumber);
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data =>{
        
        console.log(data.length);
        if(data.length == 0){
          this.bookPageNumber--;
          alert("You are at the last page of durectory and Data on this page are as follow");
          this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
            data => {
              this.allBook = data;
            },
            error => {
              if(error = 'ERR_INTERNET_DISCONNECTED'){
                alert("Not connected to Internet, check your connection please");  
              }
              console.log("some error occured");
              console.log(error.errorMessage);}
          )
        }
        else{
          console.log("hello");
          this.allBook = data;
        }
        console.log(data.length);
        
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
    if(this.bookPageNumber <= 0){
      alert("You are the first page of directory; and data are as follow");
      this.bookPageNumber = 1;
    }
    console.log(this.bookPageNumber);
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data =>{
        
        
        if(data.length == 0){
          this.bookPageNumber++;
          alert("data not found");
        }
        else{
          this.allBook = data;
          console.log(data);
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

  navigateToPage() {
    console.log(this.bookPageNumber);
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data =>{
        if(data.length == 0){
          alert("data not found");
        }
        else{
          this.allBook = data;
          console.log(data);
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

  lettersOnly(input){
    var regex = /[^0-9]/g;
    input.value = input.value.replace(regex,"");
    if(input <= 0 || input >= 2){
      input.value = input.value.replace("1");
    }
  }

}
