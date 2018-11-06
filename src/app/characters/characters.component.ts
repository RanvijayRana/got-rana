import { Component, OnInit } from '@angular/core';
import { BookHttpService } from '../book-http.service';

declare var $: any;

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  public allCharacters =[];
  public bookPageNumber: number = 1;
  public maxPage: number;
  public pageNumber: number = 1;
  public bookName: string = "";
  public flag:number = 0;

  constructor(public bookHttpService: BookHttpService) { }

  ngOnInit() {

    if (2138 % 6 == 0) {
      this.maxPage = 12 / 6;
    }
    else {
      this.maxPage = 2138 / 6 + 1;
    }

    $(".me").focusout(() => {
      if (this.bookPageNumber < 1 || this.bookPageNumber > this.maxPage) {
        $(".btnid").css("display", "none");
      }
      else {
        $(".btnid").css("display", "flex");
      }
    }
    )

    this.allCharacters = this.bookHttpService.getAllCharacters().subscribe(
      data =>{
        this.allCharacters = data;
        //this.allBook = data[0].authors;
      },
      error =>{
        console.log("some error occured");
        console.log(error.errorMessage);
      },
      beforeSend => {
        $(".loader").css("display", "flex");
      },
      complete => {
        $(".loader").css("display", "none");
      }
    )
  }

  searchBook() {
    while(this.pageNumber <= this.maxPage && this.flag == 0){
      this.allBook = this.bookHttpService.getAllBook(this.pageNumber).subscribe(
        data => {
          if(data.length >= 0){
            for (let index = 0; index < data.length; index++) {
              if(data[index].name == this.bookName){
                  this.flag ++;
                  this.allBook = [];
                  this.allBook.push(data[index]);
                  break;
              }  
            }
          }
        },
        error => {
          if (error = 'ERR_INTERNET_DISCONNECTED') {
            alert("Not connected to Internet, check your connection please");
          }
          console.log("some error occured");
          console.log(error.errorMessage);
        }
      )
          this.pageNumber++;


    }
    
  }

  bookNextPageCounter() {
    this.bookPageNumber++;
    console.log(this.bookPageNumber);
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data => {

        console.log(data.length);
        if (data.length == 0) {
          this.bookPageNumber--;
          alert("You are at the last page of directory and Data on this page are as follow");
          this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
            data => {
              this.allBook = data;
            },
            error => {
              if (error = 'ERR_INTERNET_DISCONNECTED') {
                alert("Not connected to Internet, check your connection please");
              }
              console.log("some error occured");
              console.log(error.errorMessage);
            }
          )
        }
        else {
          console.log("hello");
          this.allBook = data;
        }
        console.log(data.length);

      },
      error => {
        if (error = 'ERR_INTERNET_DISCONNECTED') {
          alert("Not connected to Internet, check your connection please");
        }
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  bookPrevPageCounter() {
    this.bookPageNumber--;
    if (this.bookPageNumber <= 0) {
      alert("You are the first page of directory; and data are as follow");
      this.bookPageNumber = 1;
    }
    console.log(this.bookPageNumber);
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data => {


        if (data.length == 0) {
          this.bookPageNumber++;
          alert("data not found");
        }
        else {
          this.allBook = data;
          console.log(data);
        }
        //this.allBook = data[0].authors;
      },
      error => {
        if (error = 'ERR_INTERNET_DISCONNECTED') {
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
      data => {
        if (data.length == 0) {
          alert("data not found");
        }
        else {
          this.allBook = data;
          console.log(data);
        }
        //this.allBook = data[0].authors;
      },
      error => {
        if (error = 'ERR_INTERNET_DISCONNECTED') {
          alert("Not connected to Internet, check your connection please");
        }
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  digitsOnly(input) {
    var regex = /[^0-9]/g;
    input.value = input.value.replace(regex, "");
  }

  lettersOnly(input) {
    var regex = /[^a-z]/gi;
    input.value = input.value.replace(regex, "");
  }


}