
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/shared/model/Message';
import { OnlineUserDto, User } from 'src/app/shared/model/user';
import { ColorConverter } from 'src/app/Utils/ColorConverter';
import { TimeConverter } from 'src/app/Utils/TimeConverter';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit, OnChanges {

  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ];
  set = "twitter";

  @Input()selectedUser!: OnlineUserDto;
  @Output()isCloseChatBoxEvt = new EventEmitter();
  @Output()sentMessageEvt = new EventEmitter<Message>();
  @Input()messages: Message[] = [];
  public text!: string;
  public currentUser!: OnlineUserDto;
  public onlUsers: OnlineUserDto[] = [];
  public colorUtils: any;
  public timeUtils: any;
  public selectedEmoji: any;
  loggedInUser!: User;
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event:any) {
    const { text } = this;
    const message = `${text}${event.emoji.native}`;
    this.text = message;
  }

  onFocus() {
    this.showEmojiPicker = false;
  }
  onBlur() {
  }
  constructor() { }

  ngOnChanges(): void {}
  ngOnInit(): void {
    this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}')
    this.currentUser = new OnlineUserDto(this.loggedInUser.emailId, this.loggedInUser.name);
    this.timeUtils = new TimeConverter();
    this.colorUtils = new ColorConverter();
    this.text = '';
  }

  public setColor(username: string): void{
    return this.colorUtils.setColor(username);
  }

  convertTime(time: Date): string{
    const converted = this.timeUtils.convertDateComment(time);
    return converted;
  }

  closeChatBox(): void{
    this.isCloseChatBoxEvt.emit(true);
  }

  send(): void {
    const mes =  new Message(this.currentUser.emailId, this.currentUser.name, this.selectedUser.emailId, this.selectedUser.name, this.text);
    const converted = JSON.stringify(mes);
   console.log(mes)
    this.sentMessageEvt.emit(mes);
    this.messages.push(mes);
    this.text = '';
  }

  select($event: { emoji: any; })
  {
    this.selectedEmoji = $event.emoji;
  }

  enter(event: any) {
    this.text = event.target.value;
    const mes = new Message(this.currentUser.emailId, this.currentUser.name, this.selectedUser.emailId, this.selectedUser.name, this.text);
    const converted = JSON.stringify(mes);
    this.sentMessageEvt.emit(mes);
    this.messages.push(mes);
    this.text = '';
  }

}
