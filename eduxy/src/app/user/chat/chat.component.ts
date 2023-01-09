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
  message!: FormGroup;
  msg!: string;
  channelUuid!: string;
  webSocketService!: WebsocketService;
  greeting: any;
  name!: string;
  constructor(private fb: FormBuilder,private router: Router, private route: ActivatedRoute,
     private chatService:ChatService) { }
 
  ngOnInit(): void {
    
   this.webSocketService=new WebsocketService(new ChatComponent(this.fb,this.router,this.route,this.chatService))
    this.chatChannel=new chatChannel();
    this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}');
    console.log(this.loggedInUser);
    this.chatChannel.userIdOne=this.loggedInUser.emailId;
    this.chatChannel.userIdTwo="test12@gmail.com";
    this.connect()
    this.establishconnection()
  

  }
  connect(){
    this.webSocketService._connect();
  }

  disconnect(){
    this.webSocketService._disconnect();
  }

  sendMessage(){
    this.webSocketService._send(this.chatMessage);
  }

  handleMessage(chatMessage: chatMessage){
      this.chatMessage={ id:1,
      authorUserId:this.chatChannel.userIdOne,
      recipientUserId: this.chatChannel.userIdTwo,
      contents:this.msg,
  }
    
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
