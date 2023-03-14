import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { HomeService } from './home.service';
import { HomeSharedService } from "./home-shared-service";
import { UserSharedService } from '../user-shared-service';
import { Teacher } from 'src/app/shared/model/teacher';
import { ChatComponent } from '../chat/chat.component';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  isViewProductSelected: boolean = false;
    isRouting: boolean = false;
    optionSelected!: string;
    loggedInUser!: User;
    searchText!: string;
    searchString!:String;
    teachers:Teacher=JSON.parse(sessionStorage.getItem("teachers")|| '{}')
    errorMessage!:String;
    flag:boolean=false;
    friend!:User;
    chatComponent!:ChatComponent
    role!:string
  

    public data: any;
  constructor(private router: Router, private chatService:ChatService, private route: ActivatedRoute, private homeService: HomeService, private userSharedService : UserSharedService) { }

  ngOnInit(): void {
    this.teachers=new Teacher()
    this.teachers=JSON.parse(sessionStorage.getItem("teachers")|| '{}')
    this.userSharedService.updatedCustomer.subscribe(user => this.loggedInUser = user);
        this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}');
        console.log(this.loggedInUser);
        this.flag=false
        console.log(this.teachers);
    //   this.chatComponent=new ChatComponent(this.router,this.route,this.chatService)
  }

  

  logout() {
    sessionStorage.clear(); 
    this.router.navigate([""])
}
search(){
  if(this.loggedInUser.role=="student"){
  this.homeService.searchTeacher(this.searchString)
  .subscribe(
 
      (response) => {
        this.data= response
        console.log(this.data)
         this.flag=true;
         this.role='student'
    }   
    
      , error => this.errorMessage = <any>error
  )}
  else{
    this.homeService.searchStudent(this.searchString)
    .subscribe(
   
        (response) => {
          this.data= response
          console.log(this.data)
           this.flag=true;
           this.role='teacher'
      }   
      
        , error => this.errorMessage = <any>error
    )
  }

}

chat(teacher : Teacher) {
  console.log(teacher)
//  this.friend={ emailId:teacher.emailId,
//   name:"",
//   password: "",
//   newPassword:"",
//   phoneNumber:"",
//   role:"",
//   address:[],
//   student: [],
//   teacher: [],
//   channelId:""
//   }
  this.chatService.getUserBeEmail(teacher.emailId).subscribe(
    (response)=>{
      this.friend=response;
      sessionStorage.setItem("friend", JSON.stringify(this.friend));
    }
  )
 


window.location.href="http://localhost:4200/home/chat"
}
}
