import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { chatChannel } from 'src/app/shared/model/chatChannel';
import { chatMessage } from 'src/app/shared/model/chatMessage';
import { EstablishedchatConnection } from 'src/app/shared/model/EstablishedChatConnection';
import { User } from 'src/app/shared/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient) { }
  private connecting: boolean = false;
  private topicQueue: any[] = [];
 
 
  // constructor( chatComponent: ChatComponent,private route: ActivatedRoute) { 
  //   this.chatComponent=chatComponent;
  //   this.channelUuid=this.route.snapshot.params['channelId']
  //   this.topic="/topic/message/"+this.channelUuid
  //  }
  
  // establishChatSession(ChatChannel: chatChannel):Observable<EstablishedchatConnection>{
  //   console.log(ChatChannel)
  //   const url = environment.chatAPIUrl + '/chat/';
  //    return this.http.post<EstablishedchatConnection>(url,ChatChannel,{headers:this.headers})
  //    .pipe(catchError(this.handleError));
  // }

  // Sent(ChannelId:String,chatmessage:chatMessage):Observable<chatMessage>{
  
  //    console.log(chatmessage)
  //   const url = environment.chatAPIUrl + '/chat/'+ChannelId;
  //   return this.http.post<chatMessage>(url,chatmessage,{headers:this.headers})
  //    .pipe(catchError(this.handleError));
  // }
  // getExistingChatSessionMessages(ChannelId:String):Observable<chatMessage[]>{
  //   console.log(ChannelId)
  //   const url = environment.chatAPIUrl + '/channel/'+ChannelId;
  //   return this.http.post<chatMessage[]>(url,{headers:this.headers})
  //    .pipe(catchError(this.handleError));
  // }

  // getFriendList(Id :String):Observable<User[]>{
  //   const url = environment.chatAPIUrl + '/friend/'+Id;
  //   return this.http.get<User[]>(url,{headers:this.headers})
  //    .pipe(catchError(this.handleError));
  // }
 
  getUserBeEmail(emailId:string):Observable<User>{
    const url =environment.userAPIUrl+"/user/"+emailId;
    return this.http.post<User>(url,{headers:this.headers})
    .pipe(catchError(this.handleError));
  }

  getStorage() {
    const storage = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data :any) {
    localStorage.setItem('chats', JSON.stringify(data));
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
