import { Injectable } from "@angular/core";

import { BehaviorSubject, throwError, Observable } from "rxjs";

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { User } from "src/app/shared/model/user";


@Injectable({
    providedIn: 'root'
})
export class HomeSharedService {
    
    constructor(private http: HttpClient){}

  

    private loggedInCustomer = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("user")|| '{}'));
    updatedCustomer = this.loggedInCustomer.asObservable();

  

    private handleError(err: HttpErrorResponse) {
        console.log(err)
        let errMsg:string='';
        if (err.error instanceof Error) {   
            errMsg=err.error.message;
            console.log(errMsg)
        }
         else if(typeof err.error === 'string'){
            errMsg=JSON.parse(err.error).message
        }
        else {
           if(err.status==0){ 
               errMsg="A connection to back end can not be established.";
           }else{
               errMsg=err.error.message;
           }
         }
            return throwError(errMsg);
    }

}