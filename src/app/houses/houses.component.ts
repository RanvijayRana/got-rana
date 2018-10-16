import { Component, OnInit } from '@angular/core';
import { BookHttpService } from '../book-http.service';

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {

  public allHouse = [];

  constructor(public bookHttpService: BookHttpService) { }

  ngOnInit() {
    this.allHouse = this.bookHttpService.getAllHouse().subscribe(
      data =>{
        console.log(data);
        this.allHouse = data;
      },
      error =>{
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

}
