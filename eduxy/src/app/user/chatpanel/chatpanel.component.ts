import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
//import { MatDrawer } from '@angular/material/sidenav';
import { interval, Subscription } from 'rxjs';
import { Message } from 'src/app/shared/model/Message';
import { OnlineUserDto, User } from 'src/app/shared/model/user';
import { ColorConverter } from 'src/app/Utils/ColorConverter';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Router } from '@angular/router';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { ChatpanelService } from './chatpanel.service';
import { startWith, switchMap } from 'rxjs/operators';
import { MatDrawer } from '@angular/material/sidenav';


@Component({
  selector: 'app-chatpanel',
  templateUrl: './chatpanel.component.html',
  styleUrls: ['./chatpanel.component.css']
})
export class ChatpanelComponent implements OnInit, OnChanges {

 
  constructor( private _snackBar: MatSnackBar,
    private router: Router,
    private chatService: ChatpanelService) { }
   @ViewChild('drawer') drawer!: MatDrawer;
  private serverUrl = environment.wsAPIUrl;
  stompClient!:any
  @Input()sentMessage!: Message 
  @Output()selectedUsrEvt = new EventEmitter<OnlineUserDto>();
  @Output()messagesEvt = new EventEmitter();
  public messages: Message[] = [];
  public noOfUsersHavingNewMsgs!: number;
  public currentUser!: OnlineUserDto;
  public selectedUser!: OnlineUserDto;
  public message!: string;
  public onlUsers!: OnlineUserDto[];
  public timeInterval!: Subscription;
  public colorUtils: any;
  public isLogIn!: boolean;
  public loggedInUser!:User;
  ngOnChanges(): void{
    console.log(this.sentMessage)
    if (this.sentMessage != undefined){
      console.log(this.sentMessage)
      this.stompClient.send(`/app/chat/`, {}, JSON.stringify(this.sentMessage));
    }
 //   this.sentMessage=;
  
  }
  ngOnInit(): void {
    console.log("hoiafjkgdsblja")
    this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}')
    this.onlUsers = [];
    this.colorUtils = new ColorConverter();
    this.noOfUsersHavingNewMsgs = 0
      this.currentUser = new OnlineUserDto(this.loggedInUser.emailId, this.loggedInUser.name);
      this.colorUtils = new ColorConverter();

      const that = this;
      this.timeInterval = interval(3000)
        .pipe(
          startWith(0),
          switchMap(() => that.chatService.getOnlineUsers(that.currentUser.emailId))).subscribe(users => {
          this.noOfUsersHavingNewMsgs = 0;
          console.log(users)
          const onlineUsrs: OnlineUserDto[] = [];
          users.forEach((u) => {
            // remove currentUser from online list and recheck non duplicate value from backend
            if (onlineUsrs.filter(o => o.name === u.name).length === 0 && u.name !== this.currentUser.name) {
              console.log( u.noOfNewMessages)
              onlineUsrs.push(u);
            }
            if (u.noOfNewMessages > 0 && u.noOfNewMessages != null){
              this.noOfUsersHavingNewMsgs += 1;
            }
          });
           console.log( this.noOfUsersHavingNewMsgs)
          that.onlUsers = onlineUsrs;

      this.initializeWebSocketConnection();
    });
  }
  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }

  initializeWebSocketConnection(): void {

    console.log('connected to chat ...');

    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({username: that.currentUser.emailId}, function(frame:any) {
      that.stompClient.subscribe('/user/' + that.currentUser.name + '/queue/messages', (noti:any) => {
        const senderName = noti.body.split(',')[1].split(':')[1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        if (that.selectedUser == null || senderName !== that.selectedUser.name) {
          that._snackBar.open('Receive new message from ' + senderName, 'Got it!');
        } else {
          that.chatService.getChatMessages(that.selectedUser.emailId, that.currentUser.emailId).subscribe((mes: any) => {
            that.messagesEvt.emit(mes);
          });
        }
      }, {username: that.currentUser.name});
    });
  }

  public setColor(username: string): void {
    return this.colorUtils.setColor(username);
  }

  public openChatBox(user: OnlineUserDto): void{
    console.log(user)
    this.selectedUser = user;
    this.selectedUsrEvt.emit(user);
    this.chatService.getChatMessages(user.emailId, this.currentUser.emailId).subscribe((mes: Message[]) => {
      console.log(mes)
      this.messages = mes;
      this.messagesEvt.emit(mes);
    });
  }

  public openDrawer():void{
    if(this.loggedInUser!=null){
      console.log("hjkafhjshoiaygihkdjojh")
     this.drawer.toggle();
    }
    else{
     this._snackBar.open('Please login to chat with others', 'Login', { duration: 3000})
        .onAction()
        .subscribe(() => this.router.navigateByUrl('/login'));
    }
  }

}
