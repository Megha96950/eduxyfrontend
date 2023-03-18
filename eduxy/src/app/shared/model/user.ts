import { Address } from "./address";
import { Student } from "./student";
import { Teacher } from "./teacher";



export class User {

    // private String emailId;
    // private String name;
    // private String password;
    // private String phoneNumber;
    // private List<Address> addresses;
    emailId!: string;
    name!: string;
    password!: string;
    newPassword!: string;
    phoneNumber!: string;
    role!:string;
    address!: Address[];
    student!: Student[];
    teacher!: Teacher[];
    channelId!:String

  
    //check for customer carts
}

export class OnlineUserDto {
    constructor(emailId: string,name: string){
        this.emailId = emailId;
        this.name = name;
        this.sessionId = undefined;
        this.noOfNewMessages = 0;
        this.status = "OFFLINE";
      }
    public emailId!: string;
    public sessionId?: string;
    public name!: string;
    public noOfNewMessages!: number;
    public status!: string;
  }

  export class Payload{
    public name!: string;
    public emailId!: string;
    public role!: string;
    public exp!: number;
  }