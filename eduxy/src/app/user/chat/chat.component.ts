import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { chatChannel } from 'src/app/shared/model/chatChannel';
import { EstablishedchatConnection } from 'src/app/shared/model/EstablishedChatConnection';
import { User } from 'src/app/shared/model/user';
import { UserSharedService } from '../user-shared-service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  establishedChatChannel!: EstablishedchatConnection;
  errorMessage!:String;
  chatChannel!:chatChannel;
  loggedInUser!: User;
  constructor(private router: Router, private route: ActivatedRoute, private userSharedService : UserSharedService,private chatService:ChatService) { }
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}');
    this.chatChannel.userIdOne=this.loggedInUser.emailId;

  }
  establishconnection(){
  this.chatService.establishChatSession(this.chatChannel).subscribe(
 
    (response) => {
      this.establishedChatChannel= response
      console.log(this.establishedChatChannel)
    }   
  
    , error => this.errorMessage = <any>error
)
}

}
