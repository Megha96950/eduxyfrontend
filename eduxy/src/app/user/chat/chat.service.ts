import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { chatChannel } from 'src/app/shared/model/chatChannel';
import { EstablishedchatConnection } from 'src/app/shared/model/EstablishedChatConnection';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  
  establishChatSession(ChatChannel: chatChannel):Observable<EstablishedchatConnection>{
    const url = environment.chatAPIUrl + '/chat/';
     return this.http.put<EstablishedchatConnection>(url,chatChannel,{ responseType: 'text' as 'json'})
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

  // search(searchString: String):Observable<Teacher []>{
  
  //   const url = environment.studentAPIUrl + '/searchTeacher/'+searchString
  //   return this.http.post<Teacher[]>(url,{ responseType: 'text' as 'json'})
  //   .pipe(catchError(this.handleError));
  // }
  // var establishChatSession = function(userIdOne, userIdTwo) {
  //   return $http({
  //     method: 'PUT',
  //     url: '/api/private-chat/channel',
  //     data: {
  //       userIdOne: userIdOne,
  //       userIdTwo: userIdTwo
  //     },
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
 // };

}
