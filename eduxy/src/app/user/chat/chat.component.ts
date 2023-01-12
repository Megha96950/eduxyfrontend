import { AfterViewChecked, Component,OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { chatChannel } from 'src/app/shared/model/chatChannel';
import { chatMessage } from 'src/app/shared/model/chatMessage';
import { EstablishedchatConnection } from 'src/app/shared/model/EstablishedChatConnection';
import { User } from 'src/app/shared/model/user';
import { UserSharedService } from '../user-shared-service';
import { ChatService } from './chat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WebsocketService } from 'src/app/shared/websocket.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  {

  establishedChatChannel!: EstablishedchatConnection;
  errorMessage!:String;
  chatChannel!:chatChannel;
  loggedInUser!: User;
  chatMessage!:chatMessage;
 messages: chatMessage[] = [];
  msg!: string;
  channelUuid!: string;
  webSocketService!: WebsocketService;
  greeting: any;
  name!: string;
  MESSAGES_RENDERING_WAIT_TIME = 1000
  
  constructor(private fb: FormBuilder,private router: Router, private route: ActivatedRoute,
     private chatService:ChatService) { 
      
    
     }
 
  ngOnInit(): void {
    
   this.webSocketService=new WebsocketService(new ChatComponent(this.fb,this.router,this.route,this.chatService))
    this.chatChannel=new chatChannel();
    this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}');
    console.log(this.loggedInUser);
    this.chatChannel.userIdOne=this.loggedInUser.emailId;
    this.chatChannel.userIdTwo="";
    this.connect();
    this.establishconnection();
    this.getExistingChatMessages();
  

  }
  connect(){
    this.webSocketService._connect();
  }

  disconnect(){
    this.webSocketService._disconnect();
  }

  sendMessage(){
    this.chatMessage={ id:1,
      authorUserId:this.chatChannel.userIdOne,
      recipientUserId: this.chatChannel.userIdTwo,
      contents:this.msg,}
      
    this.webSocketService._send(this.chatMessage,this.establishedChatChannel.channelUuid);
    this.onMessage(this.chatMessage);

  }
  establishconnection(){
  this.chatService.establishChatSession(this.chatChannel).subscribe(
 
    (response) => {
      this.establishedChatChannel= response
      sessionStorage.setItem("chatSession", JSON.stringify(this.establishedChatChannel));
     
    }   
  
    , error => this.errorMessage = <any>error
    
)

}
getExistingChatMessages(){
  this.establishedChatChannel= JSON.parse(sessionStorage.getItem("chatSession")|| '{}');

  this.chatService.getExistingChatSessionMessages(this.establishedChatChannel.channelUuid).subscribe(
    (response)=>{
      console.log(response)
      response.forEach(element => {
        
        this.addChatMessageToUI(element)
     
      });
      this.scrollToLatestChatMessage();
    }
  )
   
};

scrollToLatestChatMessage() {
  var chatContainer = $('#chat-area');

  setTimeout(function(){
    if (chatContainer.length > 0) { chatContainer.scrollTop(chatContainer[0].scrollHeight); }        
  }, this.MESSAGES_RENDERING_WAIT_TIME);
 
    
};

addChatMessageToUI(message: chatMessage) {
     this.messages.push({
      id:message.id,
      contents:message.contents,
      authorUserId:message.authorUserId,
      recipientUserId:message.recipientUserId
     });
  // self.message.push({
  //     contents: message.contents,
  //     isFromRecipient: message.fromUserId != UserService.getUserInfo().id,
  //     author: (message.fromUserId == UserService.getUserInfo().id) ? self.userOneFullName : self.userTwoFullName
  //   });

  // if (withForceApply) { self.$apply(); }
}

  onMessage(chatMessage:chatMessage) {
  this.addChatMessageToUI(chatMessage);
  this.scrollToLatestChatMessage();
};


// SentMessage(){
 
// console.log(this.chatMessage)
//   this.establishedChatChannel= JSON.parse(sessionStorage.getItem("chatSession")|| '{}');
  
// this.chatService.Sent(this.establishedChatChannel.channelUuid,this.chatMessage).subscribe(
//   (response) => {
//     this.chatMessage= response
//     console.log(this.chatMessage)
//   }   

//   , error => this.errorMessage = <any>error
// )
// }


}

