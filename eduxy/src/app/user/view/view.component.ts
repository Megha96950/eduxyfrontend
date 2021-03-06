import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {


  currentUser!: User
  userType!:string
  id: number = Number(localStorage.getItem('currentUser'));

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem("user")|| '{}')
    this.userType= JSON.parse(sessionStorage.getItem("userType")|| '{}')
  }

  forward(){
    if(this.currentUser.role=='teacher')
      this.router.navigate(["/home/teacher-detail"])
    else 
    this.router.navigate(["/home/student-detail"])
  }
 
}
