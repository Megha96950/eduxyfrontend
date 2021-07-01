import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  teachers!:Teacher[]
  role!:string ;
  currentUser: User = JSON.parse(sessionStorage.getItem("user")|| '{}')


  teacherDetailForm!: FormGroup ;
  errorMessage!: string;
  successMessage!: string;
  dPhoto!: File;
  iPhoto!: File;
  teacherFile!:TeacherFile;
  ID!: FormGroup;
  degree!:FormGroup;

  status!:number

 


 
  constructor(private fb: FormBuilder,private userDetailService: UserDetailService, private router: Router,private modalService: NgbModal) {
    
   }

  ngOnInit(): void {
    this.teacher = new Teacher();
    this.createForm();
    this.idForm()
    this.degreeForm()
    this.currentUser=JSON.parse(sessionStorage.getItem("user")|| '{}')
    this.status=Number( JSON.parse(sessionStorage.getItem("status")|| '{}'))
    this.teachers=this.currentUser.teacher
    console.log(this.status)
    if(isNaN(this.status)){
         if(this.currentUser.teacher[0]==undefined)
            this.status=1 
         else {
              if(this.currentUser.teacher[0].idPhoto==null||this.currentUser.teacher[0].degreePhoto==null)
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

    this.errorMessage = 'null';
    this.successMessage = 'null';
    const uploadImageData = new FormData();
   uploadImageData.append('id_Photo', this.iPhoto, this.iPhoto.name);
    this.userDetailService.addId(uploadImageData,this.currentUser.emailId,this.teachers[0].teacherId).
       subscribe(
        (response) => {
          this.successMessage = response;
          let T=this.teachers[0];
          T.idPhoto=this.iPhoto
          this.teachers.pop
          this.teachers.push(T);
          this.currentUser.teacher = this.teachers;
          sessionStorage.setItem("user", JSON.stringify(this.currentUser));
          console.log(this.currentUser.teacher[0])

          //this.ID.reset();
      }
      , error => this.errorMessage = <any>error

  )

    
  }

  addDegree(){
    this.errorMessage = 'null';
    this.successMessage = 'null';
    const uploadImageData = new FormData();
    uploadImageData.append('degree_Photo', this.dPhoto, this.dPhoto.name);
    this.userDetailService.addDegree(uploadImageData,this.currentUser.emailId,this.teachers[0].teacherId ).
       subscribe(
        (response) => {
          this.successMessage = response;
          let T=this.teachers[0];
          console.log(T)
          T.degreePhoto=this.dPhoto
          // this.teachers.pop
          // this.teachers.push(T);
          this.currentUser.teacher = this.teachers;
          sessionStorage.setItem("user", JSON.stringify(this.currentUser));
          console.log(this.currentUser.teacher[0])
;
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
            this.successMessage= response
            this.status=2;
            let id = this.successMessage.substring(this.successMessage.indexOf(":")+1).trim();
            this.teacher.teacherId = parseInt(id);
            this.teachers.push(this.teacher);
            this.currentUser.teacher = this.teachers;
         
            sessionStorage.setItem("status", JSON.stringify(this.status));
            sessionStorage.setItem("user", JSON.stringify(this.currentUser));
            console.log(this.currentUser.teacher[0])
          }   
        
          , error => this.errorMessage = <any>error
      )

  }


  open(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then(() => {}, () => {});
  }
 
}
