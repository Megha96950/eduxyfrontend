import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Payload, User } from "src/app/shared/model/user";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})
export class LoginService {

    @Output()payload: EventEmitter<Payload> = new EventEmitter();
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) {

    }

    login(user: User): Observable<User> {
        const url = environment.userAPIUrl + '/userLogin';

        return this.http.post<User>(url,user,{headers:this.headers})
        .pipe(catchError(this.handleError));

    }

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