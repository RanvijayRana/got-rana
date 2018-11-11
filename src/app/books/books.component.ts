import { Component, OnInit } from '@angular/core';

import { BookHttpService } from '../book-http.service'
declare var $: any;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public allBook = [];
  public bookPageNumber: number = 1;
  public maxPage: number;
  public pageNumber: number;
  public bookName: string = "";
  public flag: number;
  public showLoader: boolean = true;

  constructor(public bookHttpService: BookHttpService) { }

  ngOnInit() {

    if (12 % 6 == 0) {
      this.maxPage = 12 / 6;
    }
    else {
      this.maxPage = Math.floor(12 / 6) + 1;
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

    this.showLoader = true;

    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data => {
        this.showLoader = false;
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

  searchBook() {
    this.pageNumber = 1;
    this.flag = 0;
    this.showLoader = true;
    while ((this.pageNumber <= this.maxPage) && (this.flag == 0)) {
      this.allBook = this.bookHttpService.getAllBook(this.pageNumber).subscribe(
        data => {
          this.showLoader = false;
          if (data.length >= 0) {
            for (let index = 0; index < data.length; index++) {
              if (data[index].name.toLowerCase() == (this.bookName.toLowerCase())) {
                this.flag++;
                this.allBook = [];
                this.allBook.push(data[index]);
                break;
              }
            }
          }
        },
        error => {
          this.showLoader = false;
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
    this.showLoader = true;
    this.bookPageNumber++;
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data => {
        this.showLoader = false;
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
          this.allBook = data;
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
  }

  bookPrevPageCounter() {
    this.showLoader = true;
    this.bookPageNumber--;
    if (this.bookPageNumber <= 0) {
      alert("You are the first page of directory; and data are as follow");
      this.bookPageNumber = 1;
    }
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data => {

        this.showLoader = false;
        if (data.length == 0) {
          this.bookPageNumber++;
          alert("data not found");
        }
        else {
          this.allBook = data;
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
  }

  navigateToPage() {
    this.showLoader = true;
    this.allBook = this.bookHttpService.getAllBook(this.bookPageNumber).subscribe(
      data => {
        this.showLoader = false;
        if (data.length == 0) {
          alert("data not found");
        }
        else {
          this.allBook = data;
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

}
