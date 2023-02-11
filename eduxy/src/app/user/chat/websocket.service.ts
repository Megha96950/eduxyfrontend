import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';




import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from './chat.component';
import { chatMessage } from 'src/app/shared/model/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private connecting: boolean = false;
  private topicQueue: any[] = [];
  socket = new SockJS('http://localhost:3333/Eduxy_Server/ws');
  stompClient!:any
  chatComponent!:ChatComponent
  topic!: string ;
  chatMessage!:chatMessage
   channelUuid!:String;
 
  constructor( chatComponent: ChatComponent,private route: ActivatedRoute) { 
    this.chatComponent=chatComponent;
    this.channelUuid=this.route.snapshot.params['channelId']
    this.topic="/topic/message/"+this.channelUuid
   }

   _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS('http://localhost:3333/Eduxy_Server/ws');
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame:any) {
      console.log(frame)
      _this.stompClient.subscribe(_this.topic, (sdkEvent:any)=> {
        _this.onMessageReceived(sdkEvent)
        console.log(sdkEvent)
      } );
      _this.stompClient.reconnect_delay = 2000;
    },this.errorCallBack );
  };

_disconnect() {
  if (this.stompClient !== null) {
      this.stompClient.disconnect();
  }
  console.log("Disconnected");
}

 
_send(chatMessage:chatMessage,channelUuid:String) {
  console.log(chatMessage);
  
  this.stompClient.send("/app/chat/"+channelUuid,{},JSON.stringify({
    id:1,
    authorUserId:chatMessage.authorUserId,
    recipientUserId:chatMessage.recipientUserId,
    contents:chatMessage.contents
  }));
  
}errorCallBack(error:any) {
  console.log("errorCallBack -> " + error)
  setTimeout(() => {
      this._connect();
  }, 5000);
}


onMessageReceived(message:any) {
  console.log("Message Recieved from Server :: " + JSON.stringify(message.body));
  
  

  //(JSON.stringify(message.body);
}
}
