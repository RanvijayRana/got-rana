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
  public baseUrl = 'https://www.anapioficeandfire.com/api/books';

  constructor(private _http:HttpClient) { 
    console.log("Book- http service called");
  }

  private handleError(err :HttpErrorResponse){
    console.log;
    console.log(err.message);
    return Observable.throw(err.message)
  }

  public getAllBook(): any{
    let myResponse = this._http.get(this.baseUrl);  
    console.log(myResponse);
    return myResponse;
  }

  public getSingleBook(myBookUrl): any{
    let myResponse = this._http.get(myBookUrl);  
    console.log(myResponse);
    return myResponse;
  }
}
