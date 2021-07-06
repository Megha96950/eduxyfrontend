import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Student } from 'src/app/shared/model/student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  addstudent(student: Student, emailId: string): Observable<string> {
    const url = environment.userAPIUrl + '/addStudent/' + emailId;
    return this.http.post<string>(url,student,{ headers: this.headers, responseType: 'text' as 'json' })
    .pipe(catchError(this.handleError));
    // return this.http.post<User>(url, user, { headers: this.headers, responseType: 'text' as 'json' })
    //     .pipe(catchError(this.handleError));

}

addId(iPhoto:FormData,emailId: string,id:number):Observable<string>{
  
  const url = environment.studentAPIUrl + '/uploadId/' + emailId + '/'+id;
  return this.http.post<string>(url,iPhoto,{ responseType: 'text' as 'json'})
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
