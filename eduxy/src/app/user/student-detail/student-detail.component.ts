import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/shared/model/student';
import { User } from 'src/app/shared/model/user';
import { StudentDetailService } from './student-detail.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router,private studentDetailService: StudentDetailService,private modalService: NgbModal) { }

  studentDetailForm!:FormGroup
  errorMessage!: string;
  successMessage!: string;
   student!:Student
   edit_password!:string
   currentUser!:User;
  status!:number
  students!:Student[]

  
  ngOnInit(): void {
    this.currentUser=JSON.parse(sessionStorage.getItem("user")|| '{}')
    this.status=Number( JSON.parse(sessionStorage.getItem("status")|| '{}'))
    
    this.createForm()
    if(isNaN(this.status)){
      if(this.currentUser.student[0]==undefined)
         this.status=1 
      else {
           if(this.currentUser.student[0].idPhoto==null)
           this.status=2;
       else 
       this.status=3;
   }
   sessionStorage.setItem("status", JSON.stringify(this.status));
   this.status=Number( JSON.parse(sessionStorage.getItem("status")|| '{}'))
   console.log(this.status)
  }
  }
  createForm() {

    this.studentDetailForm = this.fb.group({
      
        idProof: ['', [Validators.required]],
        standard: ['',[Validators.required]],
        subjects: ['',[Validators.required]],
       


    });
  }

  addStudentDetail(){
    this.errorMessage = 'null';
    this.successMessage = 'null';
    this.student = this.studentDetailForm.value as Student;
     console.log(this.edit_password)
    this.studentDetailService.addstudent(this.student,this.currentUser.emailId)
      .subscribe(
     
          (response) => {
            this.successMessage= response
            this.status=2;
            let id = this.successMessage.substring(this.successMessage.indexOf(":")+1).trim();
            this.student.studentId = parseInt(id);
            this.students.push(this.student);
            this.currentUser.student = this.students;
         
            sessionStorage.setItem("status", JSON.stringify(this.status));
            sessionStorage.setItem("user", JSON.stringify(this.currentUser));
            console.log(this.currentUser.student[0])
          }   
        
          , error => this.errorMessage = <any>error
      )

  }
}
