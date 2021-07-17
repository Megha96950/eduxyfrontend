import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { HomeService } from './home.service';
import { HomeSharedService } from "./home-shared-service";
import { UserSharedService } from '../user-shared-service';
import { Teacher } from 'src/app/shared/model/teacher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

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
  constructor(private router: Router, private route: ActivatedRoute, private homeService: HomeService, private userSharedService : UserSharedService) { }

  ngOnInit(): void {
    this.teachers=new Teacher()
    this.teachers=JSON.parse(sessionStorage.getItem("teachers")|| '{}')
    this.userSharedService.updatedCustomer.subscribe(user => this.loggedInUser = user);
        this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}');
        console.log(this.loggedInUser);
        this.flag=false
        console.log(this.teachers)
  }

  

  logout() {
    sessionStorage.clear(); 
    this.router.navigate([""])
}
search(){
  this.homeService.search(this.searchString)
  .subscribe(
 
      (response) => {
        this.teachers= response
         this.flag=true;
         sessionStorage.setItem("teacher", JSON.stringify(this.teachers));
        let teacher=JSON.parse(sessionStorage.getItem("teachers")|| '{}');
        console.log(teacher)
        
      }   
    
      , error => this.errorMessage = <any>error
  )
}
}
