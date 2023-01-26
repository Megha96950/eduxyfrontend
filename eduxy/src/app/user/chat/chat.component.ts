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
  friend!:User;
  messages: chatMessage[] = [];
  msg!: string;
  channelUuid!: string;
  webSocketService!: WebsocketService;
  friends:User[]=[];
  emailId!: string;
  MESSAGES_RENDERING_WAIT_TIME = 1000;
  
  
  constructor(private router: Router, private route: ActivatedRoute,
     private chatService:ChatService) { 
      
    
     }
 
  ngOnInit(): void {
    
   this.webSocketService=new WebsocketService(new ChatComponent(this.router,this.route,this.chatService))
    this.chatChannel=new chatChannel();
    
    this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}');
    console.log(this.loggedInUser);
    this.connect();
    this.getFriendList();
  
  

  }
  connect(){
    this.webSocketService._connect();
  }

  disconnect(){
    this.webSocketService._disconnect();
  }

  sendMessage(){
    this.channelUuid = JSON.parse(sessionStorage.getItem("channelId")|| '{}');
    this.emailId= JSON.parse(sessionStorage.getItem("emailId")|| '{}');
    this.chatMessage={ id:1,
      authorUserId:this.loggedInUser.emailId,
      recipientUserId: this.emailId,
      contents:this.msg,}
      
    this.webSocketService._send(this.chatMessage,this.channelUuid);
    this.onMessage(this.chatMessage);

  }
  establishconnection(channel : chatChannel){
  this.chatService.establishChatSession(channel).subscribe(
 
    (response) => {
      this.establishedChatChannel= response
      sessionStorage.setItem("chatSession", JSON.stringify(this.establishedChatChannel));
     
    }   
  
    , error => this.errorMessage = <any>error
    
)

}
getExistingChatMessages(channelId :String,emailId:string){
  //this.establishedChatChannel= JSON.parse(sessionStorage.getItem("chatSession")|| '{}');
  sessionStorage.setItem("channelId", JSON.stringify(channelId));
  sessionStorage.setItem("emailId", JSON.stringify(emailId));
  
  this.chatService.getExistingChatSessionMessages(channelId).subscribe(
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

handleMessage(){

}
getFriendList(){
  this.chatService.getFriendList(this.loggedInUser.emailId).subscribe(
    (response)=>{
      this.friends=response
      response.forEach(element => {
        this.chatChannel.userIdOne=this.loggedInUser.emailId;
        this.chatChannel.userIdTwo=element.emailId;
        this.chatService.establishChatSession(this.chatChannel).subscribe(
 
          (response) => {
            element.channelId= response.channelUuid;
           
           
          }   
        
          , error => this.errorMessage = <any>error
          
      )
      })
      this.friend = JSON.parse(sessionStorage.getItem("friend")|| '{}');
      if(this.friend!=undefined){
      this.friends.push(this.friend)
      this.chatChannel.userIdOne=this.loggedInUser.emailId;
      this.chatChannel.userIdTwo=this.friend.emailId;
      this.chatService.establishChatSession(this.chatChannel).subscribe(

        (response) => {
          this.friend.channelId= response.channelUuid;
         
         
        }   
      
        , error => this.errorMessage = <any>error
        
    )
    }

      console.log(this.friends)

    }
  )
}

addfriend(friend:User){

  this.friends.push(friend);
  
 
  
}



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

