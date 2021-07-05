import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Teacher } from 'src/app/shared/model/teacher';
import { User } from 'src/app/shared/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private header=new HttpHeaders();
  constructor(private http: HttpClient) { }
    addTeacher(teacher: Teacher, emailId: string): Observable<string> {
    const url = environment.userAPIUrl + '/addTeacher/' + emailId;
    return this.http.post<string>(url,teacher,{ headers: this.headers, responseType: 'text' as 'json' })
    .pipe(catchError(this.handleError));
    // return this.http.post<User>(url, user, { headers: this.headers, responseType: 'text' as 'json' })
    //     .pipe(catchError(this.handleError));

}

addId(iPhoto:FormData,emailId: string,id:number):Observable<string>{
  
  const url = environment.teacherAPIUrl + '/uploadId/' + emailId + '/'+id;
  return this.http.post<string>(url,iPhoto,{ responseType: 'text' as 'json'})
  .pipe(catchError(this.handleError));
}

addDegree(dPhoto:FormData,emailId: string,id:number):Observable<string>{
  
  const url = environment.teacherAPIUrl + '/uploadDegree/' + emailId + '/'+id;
  return this.http.post<string>(url,dPhoto,{responseType: 'text' as 'json'})
  .pipe(catchError(this.handleError));
}


updateName(edit_username:string , emailId: string ) :Observable<string>{
  console.log(edit_username)
  const url = environment.userAPIUrl + '/updateName/' + emailId;
  return this.http.post<string>(url,edit_username,{  responseType: 'text' as 'json'})
  .pipe(catchError(this.handleError));

}

updateNumber(edit_number:string , emailId: string ) :Observable<string>{

  const url = environment.userAPIUrl + '/updateNumber/' + emailId;
  return this.http.post<string>(url,edit_number,{  responseType: 'text' as 'json'})
  .pipe(catchError(this.handleError));

}

updatePassword(edit_password:string , emailId: string ) :Observable<string>{

  const url = environment.userAPIUrl + '/updatePassword/' + emailId;
  return this.http.post<string>(url,edit_password,{  responseType: 'text' as 'json'})
  .pipe(catchError(this.handleError));

}

updateAbout(edit_About:string , Id: number ) :Observable<string>{

  const url = environment.teacherAPIUrl + '/updateAbout/' + Id;
  return this.http.post<string>(url,edit_About,{  responseType: 'text' as 'json'})
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
