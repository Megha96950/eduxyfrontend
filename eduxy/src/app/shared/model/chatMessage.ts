export class chatMessage{
    id !:number;
    authorUserId!:string;
    recipientUserId!:string; 
    contents!:Text;
    timeSent!:Date; 
    }