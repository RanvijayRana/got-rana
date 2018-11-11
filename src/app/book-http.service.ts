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

  constructor(private _http:HttpClient) {}

  private handleError(err :HttpErrorResponse){
    console.log(err.message);
    return Observable.throw(err.message)
  }

  public getAllBook(bookPageNumber): any{
    
    let myResponse = this._http.get(this.baseUrl+'books?page='+bookPageNumber+'&pageSize=6'); 
    return myResponse;
  }

  public getSingleBook(myBookUrl): any{
    let myResponse = this._http.get(myBookUrl); 
    return myResponse;
  }

  public getAllHouse(housePageNumber): any{
    let myResponse = this._http.get(this.baseUrl+'houses?page='+housePageNumber+'&pageSize=6');  
    return myResponse;
  }

  public getSingleHouse(myHouseUrl): any{
    let myResponse = this._http.get(myHouseUrl);
    return myResponse;
  }

  public getAllCharacters(characterPageNumber): any{
    let myResponse = this._http.get(this.baseUrl+'characters?page='+characterPageNumber+'&pageSize=6');  
    return myResponse;
  }

  public getSingleCharacter(myCharacterUrl): any{
    let myResponse = this._http.get(myCharacterUrl);  
    return myResponse;
  }
}
