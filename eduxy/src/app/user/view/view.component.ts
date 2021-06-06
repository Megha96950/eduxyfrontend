import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {


  currentUser: User = JSON.parse(sessionStorage.getItem("user")|| '{}')
  id: number = Number(localStorage.getItem('currentUser'));

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

 
}
