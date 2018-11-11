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
  public showLoader: boolean = true;

  constructor(private _route: ActivatedRoute,private router: Router, public bookHttpService: BookHttpService,
              private loc: Location) { }

  ngOnInit() {
     let myHouseUrl = this._route.snapshot.paramMap.get('houseUrl');
     
    this.myHouse = this.bookHttpService.getSingleBook(myHouseUrl).subscribe(
      data =>{
        this.showLoader = false;
        this.myHouse = data;
      },
      error =>{
        this.showLoader = false;
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    )
  }

  public goBackToPrevPage():any{
    this.loc.back();
  }

}
