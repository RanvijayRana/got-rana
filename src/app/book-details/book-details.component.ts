import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router} from "@angular/router";
import { BookHttpService} from '../book-http.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers: [Location]
})
export class BookDetailsComponent implements OnInit {

  public myBook;
  public showLoader: boolean = true;

  constructor(private _route: ActivatedRoute,private router: Router, public bookHttpService: BookHttpService,
              private loc: Location) { }

  ngOnInit() {
     let myBookUrl = this._route.snapshot.paramMap.get('bookUrl');
     
    this.myBook = this.bookHttpService.getSingleBook(myBookUrl).subscribe(
      data =>{
        this.showLoader = false;
        this.myBook = data;
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
