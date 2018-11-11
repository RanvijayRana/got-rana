import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router} from "@angular/router";
import { BookHttpService} from '../book-http.service'

import { Location} from '@angular/common';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css'],
  providers: [Location]
})
export class CharacterDetailsComponent implements OnInit {

  public myCharacter;
  public showLoader: boolean = true;

  constructor(private _route: ActivatedRoute,private router: Router, public bookHttpService: BookHttpService,
              private loc: Location) { }

  ngOnInit() {
     let myCharacterUrl = this._route.snapshot.paramMap.get('characterUrl');
     
    this.myCharacter = this.bookHttpService.getSingleBook(myCharacterUrl).subscribe(
      data =>{
        this.showLoader = false;
        this.myCharacter = data;
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
