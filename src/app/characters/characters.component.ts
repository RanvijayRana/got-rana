import { Component, OnInit } from '@angular/core';
import { BookHttpService } from '../book-http.service';

declare var $: any;

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  public allCharacters = [];
  public characterPageNumber: number = 1;
  public maxPage: number;
  public pageNumber: number = 1;
  public characterName: string = "";
  public flag: number = 0;
  public showLoader: boolean = false;

  constructor(public bookHttpService: BookHttpService) { }

  ngOnInit() {

    if (2138 % 6 == 0) {
      this.maxPage = 2138 / 6;
    }
    else {
      this.maxPage = Math.floor(2138 / 6) + 1;
    }

    $(".me").focusout(() => {
      if (this.characterPageNumber < 1 || this.characterPageNumber > this.maxPage) {
        $(".btnid").css("display", "none");
      }
      else {
        $(".btnid").css("display", "flex");
      }
    }
    )

    this.showLoader = true;

    this.allCharacters = this.bookHttpService.getAllCharacters(this.characterPageNumber).subscribe(
      data => {
        this.showLoader = false;
        this.allCharacters = data;
      },
      error => {
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

  searchCharacter() {
    this.showLoader = true;
    while (this.pageNumber <= this.maxPage && this.flag == 0) {
      this.allCharacters = this.bookHttpService.getAllCharacters(this.pageNumber).subscribe(
        data => {
          this.showLoader = false;
          if (data.length >= 0) {
            for (let index = 0; index < data.length; index++) {
              if (data[index].name.toLowerCase() == (this.characterName.toLowerCase())) {
                this.flag++;
                this.allCharacters = [];
                this.allCharacters.push(data[index]);
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

  characterNextPageCounter() {
    this.showLoader = true;
    this.characterPageNumber++;
    this.allCharacters = this.bookHttpService.getAllCharacters(this.characterPageNumber).subscribe(
      data => {
        
        this.showLoader = false;
        if (data.length == 0) {
          this.characterPageNumber--;
          alert("You are at the last page of directory and Data on this page are as follow");
          this.showLoader = true;
          this.allCharacters = this.bookHttpService.getAllCharacters(this.characterPageNumber).subscribe(
            data => {
              this.showLoader = false;
              this.allCharacters = data;
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
          this.allCharacters = data;
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

  characterPrevPageCounter() {
    this.showLoader = true;
    this.characterPageNumber--;
    if (this.characterPageNumber <= 0) {
      this.showLoader = false;
      alert("You are the first page of directory; and data are as follow");
      this.characterPageNumber = 1;
    }
    this.allCharacters = this.bookHttpService.getAllCharacters(this.characterPageNumber).subscribe(
      data => {

        this.showLoader = false;
        if (data.length == 0) {
          this.characterPageNumber++;
          alert("data not found");
        }
        else {
          this.allCharacters = data;
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
    this.showLoader = true;
    this.allCharacters = this.bookHttpService.getAllCharacters(this.characterPageNumber).subscribe(
      data => {
        this.showLoader = false;
        if (data.length == 0) {
          alert("data not found");
        }
        else {
          this.allCharacters = data;
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