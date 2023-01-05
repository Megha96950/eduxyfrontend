import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


import { ChatComponent } from '../user/chat/chat.component';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
   webSocketEndPoint: string = 'http://localhost:3333/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    chatComponent!:ChatComponent

  constructor(chatComponent: ChatComponent) { 
    this.chatComponent=chatComponent;
   }

_disconnect() {
  if (this.stompClient !== null) {
      this.stompClient.disconnect();
  }
  console.log("Disconnected");
}
 
_send(message:string) {
  console.log("calling logout api via web socket");
  this.stompClient.send("/app/hello", {}, JSON.stringify(message));
}
}
