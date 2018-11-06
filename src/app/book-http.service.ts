import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class BookHttpService {
  public allBook;
  public currentBook;
  public baseUrl = 'https://www.anapioficeandfire.com/api/';

  constructor(private _http:HttpClient) { 
    console.log("Book- http service called");
  }

  private handleError(err :HttpErrorResponse){
    console.log;
    console.log(err.message);
    return Observable.throw(err.message)
  }

  public getAllBook(bookPageNumber): any{
    let myResponse = this._http.get(this.baseUrl+'books?page='+bookPageNumber+'&pageSize=6'); 
    console.log(`page number: ${bookPageNumber}`); 
    console.log(myResponse);
    return myResponse;
  }

  public getSingleBook(myBookUrl): any{
    let myResponse = this._http.get(myBookUrl);  
    console.log(myResponse);
    return myResponse;
  }

  public getAllHouse(housePageNumber): any{
    let myResponse = this._http.get(this.baseUrl+'houses?page='+housePageNumber+'&pageSize=6');  
    console.log(myResponse);
    return myResponse;
  }

  public getSingleHouse(myHouseUrl): any{
    let myResponse = this._http.get(myHouseUrl);  
    console.log(myResponse);
    return myResponse;
  }

  public getAllCharacters(characterPageNumber): any{
    let myResponse = this._http.get(this.baseUrl+'characters?page='+characterPageNumber+'&pageSize=6');  
    console.log(myResponse);
    return myResponse;
  }

  public getSingleCharacter(myCharacterUrl): any{
    let myResponse = this._http.get(myCharacterUrl);  
    console.log(myResponse);
    return myResponse;
  }
}
