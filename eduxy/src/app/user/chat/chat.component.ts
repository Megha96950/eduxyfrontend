import { AfterViewChecked, Component,ElementRef,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { chatChannel } from 'src/app/shared/model/chatChannel';
import { chatMessage } from 'src/app/shared/model/chatMessage';
import { EstablishedchatConnection } from 'src/app/shared/model/EstablishedChatConnection';
import { OnlineUserDto, User } from 'src/app/shared/model/user';
import { UserSharedService } from '../user-shared-service';
import { ChatService } from './chat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './websocket.service';
import { Message } from 'src/app/shared/model/Message';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  {

//   establishedChatChannel!: EstablishedchatConnection;
//   errorMessage!:String;
//   chatChannel!:chatChannel;
//   loggedInUser!: User;
//   chatMessage!:chatMessage;
//   friend!:User;
//   messages: chatMessage[] = [];
//   msg!: string;
//   channelUuid!: string;
//   webSocketService!: WebsocketService;
//   friends:User[]=[];
//   emailId!: string;
//   otherUser!:User
//   MESSAGES_RENDERING_WAIT_TIME = 1000;  
//   chatId!:string
//   notificationCount = 0;
  
//   private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//   socket = new SockJS('http://localhost:3333/Eduxy_Server/ws');
//   stompClient!:any
  
//   topic="/topic/message/" ;


//   constructor(private router: Router, private route: ActivatedRoute,
//      private chatService:ChatService,private http: HttpClient, private el: ElementRef) { 
      
    
//      }
 
//   ngOnInit(): void {
//     this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}')
//     this.getFriendList();
//    //this.webSocketService=new WebsocketService(new ChatComponent(this.router,this.route,this.chatService),this.route)
//     this.chatChannel=new chatChannel();
  

//   }

//   ngAfterViewChecked(): void {
//       this.scrollDown();
//     }
    
//     scrollDown(){
//       if(this.friends[0]!=null){
//       var container = this.el.nativeElement.querySelector("#chat-area");
//       container.scrollTop = container.scrollHeight;
//     }
//     }
//   connect(channelId:String){
//     if (this.stompClient != null) {
//       this.stompClient.disconnect();
//   }
//   console.log("Disconnected");
//     console.log("Initialize WebSocket Connection");
//     let ws = new SockJS('http://localhost:3333/Eduxy_Server/ws');
//     this.stompClient = Stomp.over(ws);
//     const _this = this;
//     this.getExistingChatMessages(channelId)
//     _this.stompClient.connect({}, function (frame:any) {
//     console.log(frame)
//       _this.stompClient.subscribe(_this.topic+channelId, (sdkEvent:any)=> {
//          console.log("halh");
//         _this.getExistingChatMessages(channelId)
//         _this.notificationCount = _this.notificationCount + 1;
//          _this.updateNotificationDisplay();
      
//         // _this.stompClient.subscribe('/user/topic/private-notifications', (sdkEvent:any)=> {
//         //   console.log("halh");
//         //   _this.notificationCount = _this.notificationCount + 1;
//         //   _this.updateNotificationDisplay();
//         //   });
//       });
    


//       _this.stompClient.reconnect_delay = 2000;
//     },this.errorCallBack );

  
   
//   }

//   disconnect(){
//     if (this.stompClient !== null) {
//       this.stompClient.disconnect();
//   }
//   console.log("Disconnected");
//   }

//   sendMessage(){
//     this.channelUuid = JSON.parse(sessionStorage.getItem("channelId")|| '{}');
//     this.emailId= JSON.parse(sessionStorage.getItem("emailId")|| '{}');
      
//    this.chatMessage={
//     id:1,
//     authorUserId:this.loggedInUser.emailId,
//     recipientUserId: this.otherUser.emailId,
//     contents:this.msg
//   }
  
//     this.stompClient.send("/app/chat/"+this.channelUuid,{},JSON.stringify({
//       id:1,
//       authorUserId:this.loggedInUser.emailId,
//       recipientUserId: this.otherUser.emailId,
//       contents:this.msg
//     }));
//     this.msg=''

//   }
  
//   errorCallBack(error:any) {
//     console.log("errorCallBack -> " + error)
//     setTimeout(() => {
//         //this.connect();
//     }, 5000);
 
   

//   }
//   establishconnection(channel : chatChannel){
    
//   this.chatService.establishChatSession(channel).subscribe(
 
//     (response) => {
//       this.establishedChatChannel= response
//       sessionStorage.setItem("chatSession", JSON.stringify(this.establishedChatChannel));
    
//     }   
  
//     , error => this.errorMessage = <any>error
    
// )

// }
// getExistingChatMessages(channelId :String){
//    while(this.messages.length>0)
//      this.messages.pop()
//  console.log(this.messages);
//   //this.establishedChatChannel= JSON.parse(sessionStorage.getItem("chatSession")|| '{}');
//   sessionStorage.setItem("channelId", JSON.stringify(channelId));

//   this.chatService.getExistingChatSessionMessages(channelId).subscribe(
//     (response)=>{
//       console.log(response)
//       response.forEach(element => {
      
//         this.addChatMessageToUI(element)
       
//       });
//       this.scrollToLatestChatMessage();
//     }
   
//  )
 
// };





// scrollToLatestChatMessage() {
//   var chatContainer = $('#chat-area');

//   setTimeout(function(){
//     if (chatContainer.length > 0) { chatContainer.scrollTop(chatContainer[0].scrollHeight); }        
//   }, this.MESSAGES_RENDERING_WAIT_TIME);
 
    
// };

// addChatMessageToUI(message: chatMessage) {

//      this.messages.push({
//       id:message.id,
//       contents:message.contents,
//       authorUserId:message.authorUserId,
//       recipientUserId:message.recipientUserId,
      
//      });
     
// }
// getFriendList(){
//   this.chatService.getFriendList(this.loggedInUser.emailId).subscribe(
//     (response)=>{
//       this.friends=response
//       response.forEach(element => {
//         this.chatChannel.userIdOne=this.loggedInUser.emailId;
//         this.chatChannel.userIdTwo=element.emailId;
//         this.chatService.establishChatSession(this.chatChannel).subscribe(
 
//           (response) => {
//             element.channelId= response.channelUuid;
           
           
//           }   
        
//           , error => this.errorMessage = <any>error
          
//       )
//       })
//       this.friend = JSON.parse(sessionStorage.getItem("friend")|| '{}');
//       const flag=this.friends.some(x=>(x.emailId==this.friend.emailId))
//       console.log(flag+" "+this.friend.emailId)

     
//       if(this.friend.emailId!=null && flag==false){
//       this.friends.push(this.friend)
//       this.chatChannel.userIdOne=this.loggedInUser.emailId;
//       this.chatChannel.userIdTwo=this.friend.emailId;
//       this.chatService.establishChatSession(this.chatChannel).subscribe(

//         (response) => {
//           this.friend.channelId= response.channelUuid;
//         }   
      
//         , error => this.errorMessage = <any>error
        
//     )
//     }

//     }
//   )
// }

// showMessageHandler(channelId:String,emailId:string){
  
//   sessionStorage.setItem("emailId", JSON.stringify(emailId));
//   sessionStorage.setItem("channelId", JSON.stringify(channelId));
//   this.chatService.getUserBeEmail(emailId).subscribe(
//     (response)=>{
//       this.otherUser=response;
      
//     }
//   )
 
//   this.connect(channelId);
//  // this.getExistingChatMessages(channelId)
//   this.el.nativeElement.querySelector("#chat-area").scrollIntoView();
// }
// addfriend(friend:User){

//   this.friends.push(friend);
  
// }

// updateNotificationDisplay() {
//   if (this.notificationCount == 0) {
//       $('#notifications').hide();
//   } else {
//       $('#notifications').show();
//       $('#notifications').text(this.notificationCount);
//   }
// }

// resetNotificationCount() {
//   this.notificationCount = 0;
//   this.updateNotificationDisplay();
// }


@Input()selectedUser!: OnlineUserDto;
@Input()sentMessage!: Message;
@Output() onlUsers = new EventEmitter();
public title = 'SenecaForum';
public username!: string;
public open!: boolean;
public isCloseChatBox!: boolean;
public messages: Message[] = [];

constructor(){}

ngOnInit(): void{
  console.log("uilgQDLJKG")
  this.open = false;
  this.isCloseChatBox = true;
}

handleToggleTopNavbar(event:any): void{
  this.open = event;
}

handleSelectedUser(event:any): void{
  this.isCloseChatBox = false;
  this.selectedUser = event;
}

handleCloseChatBox(event:any): void{
  this.isCloseChatBox = event;
}

handleMessages(event:any): void{
  this.messages = event;
}

handleSentMessage(event:any): void{
  this.sentMessage = event;
}

whenWasItPublished(myTimeStamp: Date) {
  
  return myTimeStamp;
  // const endDate = myTimeStamp.indexOf('-');
  
  // return (
  //   myTimeStamp.substring(0, endDate) +
  //   ' at ' +
  //   myTimeStamp.substring(endDate + 1)
  // );
}

}

