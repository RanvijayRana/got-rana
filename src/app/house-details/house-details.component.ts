import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router} from "@angular/router";
import { BookHttpService} from '../book-http.service';

import { Location} from '@angular/common';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css'],
  providers: [Location]
})
export class HouseDetailsComponent implements OnInit {

  public myHouse;

  constructor(private _route: ActivatedRoute,private router: Router, public bookHttpService: BookHttpService,
              private loc: Location) { }

  ngOnInit() {
     let myHouseUrl = this._route.snapshot.paramMap.get('houseUrl');
     console.log(myHouseUrl);

     
    this.myHouse = this.bookHttpService.getSingleBook(myHouseUrl).subscribe(
      data =>{
        console.log("logging data");
        console.log(data);
        this.myHouse = data;
      },
      error =>{
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  public goBackToPrevPage():any{
    this.loc.back();
  }

}
