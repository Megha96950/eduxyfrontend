import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Message } from 'src/app/shared/model/Message';
import { OnlineUserDto } from 'src/app/shared/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatpanelService {
  
  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'}
    )
  };

  constructor(
    private http: HttpClient
  ) { }

  getOnlineUsers(currentUserId: string): Observable<OnlineUserDto[]>{
    return this.http.get<OnlineUserDto[]>(`${environment.wsAPIUrl}/users/${currentUserId}`);
  }

  getChatMessages(senderId: string, recipientId: string): Observable<Message[]>{
    return this.http.get<Message[]>(`${environment.wsAPIUrl}/messages/${senderId}/${recipientId}`);
  }
}
