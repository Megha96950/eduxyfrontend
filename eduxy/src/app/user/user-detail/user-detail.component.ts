import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Teacher } from 'src/app/shared/model/teacher';
import { User } from 'src/app/shared/model/user';
import { UserDetailService } from './user-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {


  teacher!: Teacher;
  role!:string ;
  currentUser: User = JSON.parse(sessionStorage.getItem("user")|| '{}')
  id: number = Number(localStorage.getItem('currentUser'));

  teacherDetailForm!: FormGroup ;
  errorMessage!: string;
  successMessage!: string;
  constructor(private fb: FormBuilder,private userDetailService: UserDetailService) { }

  ngOnInit(): void {
    this.teacher = new Teacher();
    this.createForm();
  }
  createForm() {

    this.teacherDetailForm = this.fb.group({
        description: ['',[Validators.required]],
        higherQualification: ['', [Validators.required]],
        idProof: ['', [Validators.required]],
        degreePhoto: ['', [Validators.required]],
        idPhoto: ['',[Validators.required]],
        feesPerStudent: ['',[Validators.required]],
        subjects: ['',[Validators.required]]


    });
  }

  addTeacherDetail(){
    this.errorMessage = 'null';
    this.successMessage = 'null';
    this.teacher = this.teacherDetailForm.value as Teacher;

  this.userDetailService.addTeacher(this.teacher,this.currentUser.emailId)
      .subscribe(
          message => {
              this.successMessage = message;
              this.teacherDetailForm.reset();
          }
          , error => this.errorMessage = <any>error
      )

  }
}
