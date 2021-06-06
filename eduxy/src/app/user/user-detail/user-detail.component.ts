import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  user!: string;
  role!:string ;
  currentUser: User = JSON.parse(sessionStorage.getItem("user")|| '{}')
  id: number = Number(localStorage.getItem('currentUser'));

  detailForm!: FormGroup ;
  errorMessage!: string;
  successMessage!: string;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  createForm() {

    this.detailForm = this.fb.group({
        discription: ['',[Validators.required]],
        higherQualification: ['', [Validators.required]],
        idProof: ['', [Validators.required]],
        degreePhoto: ["", [Validators.required]],
        idPhoto: ['',[Validators.required]],
        feesPerStudent: ['',[Validators.required]]

    });
  }
}
