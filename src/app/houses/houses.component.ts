import { Component, OnInit } from '@angular/core';
import { BookHttpService } from '../book-http.service';

declare var $: any;

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {

  public allHouse = [];
  public housePageNumber: number = 1;
  public maxPage: number;
  public pageNumber: number = 1;
  public houseName: string = "";
  public flagAlpha:number = 0;
  public showLoader:boolean = false;

  constructor(public bookHttpService: BookHttpService) { }

  ngOnInit() {

    if (444 % 6 == 0) {
      this.maxPage = 444 / 6;
    }
    else {
      this.maxPage = Math.floor(444 / 6) + 1;
    }

    $(".me").focusout(() => {
      if (this.housePageNumber < 1 || this.housePageNumber > this.maxPage) {
        $(".btnid").css("display", "none");
      }
      else {
        $(".btnid").css("display", "flex");
      }
    }
    )

    this.allHouse = this.bookHttpService.getAllHouse(this.pageNumber).subscribe(
      data =>{
        console.log(data);
        this.allHouse = data;
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

  searchHouse() {
    this.showLoader = true;
    while(this.pageNumber <= this.maxPage && this.flagAlpha == 0){
      console.log("call number" + this.flagAlpha);
      this.allHouse = this.bookHttpService.getAllHouse(this.pageNumber).subscribe(
        data => {
          if(data.length >= 0){
            for (let index = 0; index < data.length; index++) {
              console.log("index" + index);
              console.log(data[index].name);
              //console.log(data[index].name.toLowerCase());
              console.log(this.houseName);
              console.log(this.houseName.toLowerCase());
              //this.flag = data[index].name.toLowerCase().search(this.houseName.toLowerCase);
              //if( data[index].name.toLowerCase().search(this.houseName.toLowerCase)){
                if( data[index].name.toLowerCase() == (this.houseName.toLowerCase())){
                  this.showLoader = false;
                  this.allHouse = [];
                  this.allHouse.push(data[index]);
                  this.flagAlpha = 1;
                  console.log(this.flagAlpha);
                  
                  console.log("time to moveon");
                  break;
                  //return 0;
                  
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
      console.log("flag value"+this.flagAlpha);
      if(this.flagAlpha > 0){
      break;
    }
          this.pageNumber++;


    }
    
  }

  houseNextPageCounter() {
    this.housePageNumber++;
    console.log(this.housePageNumber);
    this.allHouse = this.bookHttpService.getAllHouse(this.housePageNumber).subscribe(
      data => {

        console.log(data.length);
        if (data.length == 0) {
          this.housePageNumber--;
          alert("You are at the last page of directory and Data on this page are as follow");
          this.allHouse = this.bookHttpService.getAllHouse(this.housePageNumber).subscribe(
            data => {
              this.allHouse = data;
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
          this.allHouse = data;
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

  housePrevPageCounter() {
    this.housePageNumber--;
    if (this.housePageNumber <= 0) {
      alert("You are the first page of directory; and data are as follow");
      this.housePageNumber = 1;
    }
    console.log(this.housePageNumber);
    this.allHouse = this.bookHttpService.getAllHouse(this.housePageNumber).subscribe(
      data => {


        if (data.length == 0) {
          this.housePageNumber++;
          alert("data not found");
        }
        else {
          this.allHouse = data;
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
    console.log(this.housePageNumber);
    this.allHouse = this.bookHttpService.getAllHouse(this.housePageNumber).subscribe(
      data => {
        if (data.length == 0) {
          alert("data not found");
        }
        else {
          this.allHouse = data;
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
