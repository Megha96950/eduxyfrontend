import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private header=new HttpHeaders();
  constructor(private http: HttpClient) { }

  addDisplayImage(dPhoto:File,emailId: string,id:number):Observable<string>{
    const formData=new FormData();
    formData.append('Display_Image',dPhoto,dPhoto.name)
    const url= environment.studentAPIUrl+"/uploadImage/"+emailId+ '/'+id;
    return this.http.post<string>(url,formData,{ responseType: 'text' as 'json'})
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
