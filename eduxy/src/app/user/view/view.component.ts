import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { ViewService } from './view.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {


  currentUser!: User
  userType!:string
  id: number = Number(localStorage.getItem('currentUser'));
  role!:string
  errorMessage!: string;
  successMessage!: string;

  constructor(private router: Router,private viewService: ViewService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem("user")|| '{}')
    this.userType= JSON.parse(sessionStorage.getItem("userType")|| '{}')
    this.role=this.currentUser.role
   
    console.log(this.currentUser)
  }


  forward(){
    if(this.currentUser.role=='teacher')
      this.router.navigate(["/home/teacher-detail"])
    else 
    this.router.navigate(["/home/student-detail"])
  }

  imageUpload(event:any){
    console.log(event.target.files[0])
    const file:File=event.target.files[0];
    if(this.currentUser.role=="student"){
    this.viewService.addDisplayImageStudent(file,this.currentUser.emailId,this.currentUser.student[0].studentId)
    .subscribe(
      (response)=>{
        this.successMessage=response;
         this.currentUser.student[0].displayImg=file

      }
    )
    }else{
      this.viewService.addDisplayImageTeacher(file,this.currentUser.emailId,this.currentUser.teacher[0].teacherId)
      .subscribe(
        (response)=>{
          this.successMessage=response;
           this.currentUser.teacher[0].displayImg=file
  
        }
      )
    }
    
  }
 
}
