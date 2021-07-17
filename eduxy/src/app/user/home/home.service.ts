import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { environment } from "../../../environments/environment";

import { catchError } from 'rxjs/operators';
import { Teacher } from "src/app/shared/model/teacher";




@Injectable({
    providedIn: 'root'
})
export class HomeService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    search(searchString: String):Observable<Teacher>{
  
        const url = environment.studentAPIUrl + '/searchTeacher/'+searchString
        return this.http.get<Teacher>(url,{ responseType: 'text' as 'json'})
        .pipe(catchError(this.handleError));
      }
   
    private handleError(err: HttpErrorResponse) {
        console.log(err)
        let errMsg: string = '';
        if (err.error instanceof Error) {
            errMsg = err.error.message;
            console.log(errMsg)
        }
        else if (typeof err.error === 'string') {
            errMsg = JSON.parse(err.error).message
        }
        else {
            if (err.status == 0) {
                errMsg = "A connection to back end can not be established.";
            } else {
                errMsg = err.error.message;
            }
        }
        return throwError(errMsg);
    }



}