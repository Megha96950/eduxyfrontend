import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { HomeService } from './home.service';
import { HomeSharedService } from "./home-shared-service";
import { UserSharedService } from '../user-shared-service';

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
  constructor(private router: Router, private route: ActivatedRoute, private homeService: HomeService, private userSharedService : UserSharedService) { }

  ngOnInit(): void {
    this.userSharedService.updatedCustomer.subscribe(user => this.loggedInUser = user);
        this.loggedInUser = JSON.parse(sessionStorage.getItem("user")|| '{}');
        console.log(this.loggedInUser);
  }

  

  logout() {
    sessionStorage.clear(); 
    this.router.navigate([""])
}
}
