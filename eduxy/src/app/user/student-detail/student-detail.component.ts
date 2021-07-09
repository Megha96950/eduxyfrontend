import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/shared/model/student';
import { User } from 'src/app/shared/model/user';
import { UserDetailService } from '../user-detail/user-detail.service';
import { StudentDetailService } from './student-detail.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router,private studentDetailService: StudentDetailService,private userDetailService: UserDetailService,private modalService: NgbModal) { }

  studentDetailForm!:FormGroup
  errorMessage!: string;
  successMessage!: string;
  tryToLogin: boolean = false;
   student!:Student
   
   currentUser!:User;
  status!:number
  students!:Student[]

  ID!: FormGroup;
  iPhoto!: File;



  edit_username!:string
  edit_number!:string
  edit_password!:string

  name = 'Mathematics';
  
  categories = [
    {id: 1, name: 'Science'},
    {id: 2, name: 'Physics'},
    {id: 3, name: 'Chemistry'},
    {id: 4, name: 'Biology'},
    {id: 5, name: 'History'},
    {id: 6, name: 'Geography'},
    {id: 7, name: 'Civics'},
    {id: 8, name: 'Economics'},
    {id: 8, name: 'Accounting'},
    {id: 8, name: 'Taxation'},
    {id: 8, name: 'English'},
    {id: 8, name: 'Hindi'},
    {id: 8, name: 'Computer'},
    {id: 8, name: 'Coding'},
    {id: 8, name: 'Music'},
    {id: 8, name: 'Dance'},

  ];
    
  selected = [
    {id: 5, name: 'Mathemarics'},
   
  ];
   
 
 

  ngOnInit(): void {
    this.student = new Student();
    this.currentUser=JSON.parse(sessionStorage.getItem("user")|| '{}')
    this.status=Number( JSON.parse(sessionStorage.getItem("status")|| '{}'))
    this.students=this.currentUser.student
    this.createForm()
    this.idForm()
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
        instituteName:['',[Validators.required]],
        motherName:['',[Validators.required]],
        fatherName:['',[Validators.required]],
      

    });
  }

  idForm(){
    
    this.ID=this.fb.group({
      idPhoto:['',[Validators.required]]
    })
  }

  selectId(event: any) {
    this.iPhoto = event.target.files[0];
    console.log(this.iPhoto)
  }
  
  
  addStudentDetail(){
    this.tryToLogin=true
    this.errorMessage = 'null';
    this.successMessage = 'null';
    let subjects="";
    this.student = this.studentDetailForm.value as Student;
    for(let i=0;i<this.selected.length;i++){
      subjects=subjects+this.selected[i].name+",";

    }
    this.student.subjects=subjects.substring(0,subjects.length-1)
     console.log(this.student)
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

  addId(){

    this.errorMessage = 'null';
    this.successMessage = 'null';
    const uploadImageData = new FormData();
   uploadImageData.append('id_Photo', this.iPhoto, this.iPhoto.name);
    this.studentDetailService.addId(uploadImageData,this.currentUser.emailId,this.students[0].studentId).
       subscribe(
        (response) => {
          this.successMessage = response;
          this.currentUser.student[0].idPhoto = this.iPhoto;
          this.status=3;
          sessionStorage.setItem("status", JSON.stringify(this.status));
          sessionStorage.setItem("user", JSON.stringify(this.currentUser));
          console.log(this.currentUser.student[0])

          //this.ID.reset();
      }
      , error => this.errorMessage = <any>error

  )

    
  }

  open(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(() => {}, () => {});
  }

  updateName(){
    this.errorMessage = 'null';
    this.successMessage = 'null';
    this.userDetailService.updateName(this.edit_username,this.currentUser.emailId)
    .subscribe(
   
        (response) => {
          this.successMessage= response
          this.currentUser.name=this.edit_username
          sessionStorage.setItem("user", JSON.stringify(this.currentUser));
          console.log(this.currentUser)
          
        }   
      
        , error => this.errorMessage = <any>error
    )

  }

  updateNumber(){
    this.errorMessage = 'null';
    this.successMessage = 'null';
    this.userDetailService.updateName(this.edit_number,this.currentUser.emailId)
    .subscribe(
   
        (response) => {
          this.successMessage= response
          this.currentUser.phoneNumber=this.edit_number
          sessionStorage.setItem("user", JSON.stringify(this.currentUser));
          console.log(this.currentUser)
          
        }   
      
        , error => this.errorMessage = <any>error
    )

  }

  updatePassword(){
    this.errorMessage = 'null';
    this.successMessage = 'null';
    this.userDetailService.updatePassword(this.edit_password,this.currentUser.emailId)
    .subscribe(
   
        (response) => {
          this.successMessage= response
          this.currentUser.password=this.edit_password
          sessionStorage.setItem("user", JSON.stringify(this.currentUser));
          console.log(this.currentUser)
          
        }   
      
        , error => this.errorMessage = <any>error
    )

  }

}
