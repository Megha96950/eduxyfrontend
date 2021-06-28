import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/shared/model/teacher';
import { TeacherFile } from 'src/app/shared/model/techerfile';
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
  id!: number 

  teacherDetailForm!: FormGroup ;
  errorMessage!: string;
  successMessage!: string;
  dPhoto!: File;
  iPhoto!: File;
  teacherFile!:TeacherFile;
  ID!: FormGroup;
  degree!:FormGroup;
  flag:boolean=true
  status:boolean=Boolean(JSON.parse(sessionStorage.getItem("status")|| '{}'))


 
  constructor(private fb: FormBuilder,private userDetailService: UserDetailService, private router: Router) { }

  ngOnInit(): void {
    this.teacher = new Teacher();
    this.createForm();
    this.idForm()
    this.degreeForm()
  }
  

  
  
  createForm() {

    this.teacherDetailForm = this.fb.group({
        description: ['',[Validators.required]],
        higherQualification: ['', [Validators.required]],
        idProof: ['', [Validators.required]],
        feesCharged: ['',[Validators.required]],
        subjects: ['',[Validators.required]],
       


    });
  }

  idForm(){
    
    this.ID=this.fb.group({
      idPhoto:['',[Validators.required]]
    })
  }

  degreeForm(){
    this.degree=this.fb.group({
      degreePhoto:['',[Validators.required]]
    })
  }
 
  selectDegree(event: any) {
    this.dPhoto = event.target.files[0];
    console.log(this.dPhoto)
  }
  selectId(event: any) {
    this.iPhoto = event.target.files[0];
    console.log(this.iPhoto)
  }
  
  addId(){
    var tempId;
    if(this.currentUser.teacher[0]==undefined)
       tempId=this.id;
    else
      tempId=  this.currentUser.teacher[0].teacherId 
  
    this.errorMessage = 'null';
    this.successMessage = 'null';
    const uploadImageData = new FormData();
   uploadImageData.append('id_Photo', this.iPhoto, this.iPhoto.name);
    this.userDetailService.addId(uploadImageData,this.currentUser.emailId,tempId).
       subscribe(
        message => {
          this.successMessage = message;
          this.ID.reset();
      }
      , error => this.errorMessage = <any>error

  )

    
  }

  addDegree(){
    var tempId;
   if(this.currentUser.teacher[0]==undefined)
      tempId=this.id;
   else
     tempId=  this.currentUser.teacher[0].teacherId 
  
    this.errorMessage = 'null';
    this.successMessage = 'null';
    const uploadImageData = new FormData();
   uploadImageData.append('degree_Photo', this.dPhoto, this.dPhoto.name);
    this.userDetailService.addDegree(uploadImageData,this.currentUser.emailId,tempId).
       subscribe(
        message => {
          this.successMessage = message;
          this.ID.reset();
      }
      , error => this.errorMessage = <any>error

  )

    
  }
  addTeacherDetail(){
    this.errorMessage = 'null';
    this.successMessage = 'null';
    
    this.teacher = this.teacherDetailForm.value as Teacher;
    this.userDetailService.addTeacher(this.teacher,this.currentUser.emailId)
      .subscribe(
     
          (response) => {
            this.id= response
            this.flag=false;
            sessionStorage.setItem("status", JSON.stringify(this.flag));
           
           
        }   
        
          , error => this.errorMessage = <any>error
      )

  }

 
}
