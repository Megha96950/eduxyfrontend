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


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  implements OnInit,AfterViewChecked {

  establishedChatChannel!: EstablishedchatConnection;
  errorMessage!:String;
  chatChannel!:chatChannel;
  loggedInUser!: User;
  chatMessage!:chatMessage;
  message!: FormGroup;
  msg!: string;
  channelUuid!: string;
  constructor(private fb: FormBuilder,private router: Router, private route: ActivatedRoute,
     private userSharedService : UserSharedService,private chatService:ChatService,private modalService: NgbModal) { }
  ngAfterViewChecked(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    
  
    this.chatChannel=new chatChannel();
    this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}');
    console.log(this.loggedInUser);
    this.chatChannel.userIdOne=this.loggedInUser.emailId;
    this.chatChannel.userIdTwo="test12@gmail.com";
 
    this.establishconnection()
  

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
open(content: any) {
  this.modalService.open(content, { centered: true, size: 'lg' }).result.then(() => {}, () => {});
}
SentMessage(){
  this.chatMessage={ id:1,
    authorUserId:this.chatChannel.userIdOne,
    recipientUserId: this.chatChannel.userIdTwo,
    contents:this.msg,
}
console.log(this.chatMessage)
  this.establishedChatChannel= JSON.parse(sessionStorage.getItem("chatSession")|| '{}');
  
this.chatService.Sent(this.establishedChatChannel.channelUuid,this.chatMessage).subscribe(
  (response) => {
    this.chatMessage= response
    console.log(this.chatMessage)
  }   

  , error => this.errorMessage = <any>error
)
}

}
