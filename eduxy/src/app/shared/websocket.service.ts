import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';



import { ChatComponent } from '../user/chat/chat.component';
import { chatMessage } from './model/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private connecting: boolean = false;
  private topicQueue: any[] = [];
  socket = new SockJS('http://localhost:3333/Eduxy_Server/ws');
  stompClient!:any
  chatComponent!:ChatComponent
  topic: string = "/chat/greating";
  chatMessage!:chatMessage
  constructor(chatComponent: ChatComponent) { 
    this.chatComponent=chatComponent;
   }

   _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS('http://localhost:3333/Eduxy_Server/ws');
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame:any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent:any) {
        console.log(sdkEvent)
          _this.onMessageReceived(sdkEvent);
      } );
      //_this.stompClient.reconnect_delay = 2000;
    },this.errorCallBack );
  };

_disconnect() {
  if (this.stompClient !== null) {
      this.stompClient.disconnect();
  }
  console.log("Disconnected");
}
 
_send(chatMessage:chatMessage) {
  console.log("calling logout api via web socket");
  this.stompClient.send("/app/chat", chatMessage);
}

onMessageReceived(message:any) {
  console.log("Message Recieved from Server :: " + message);
  this.chatComponent.handleMessage(this.chatMessage);
}

errorCallBack(error:any) {
  console.log("errorCallBack -> " + error)
  setTimeout(() => {
      this._connect();
  }, 5000);
}
}
