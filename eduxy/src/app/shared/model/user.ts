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

  
    //check for customer carts
}