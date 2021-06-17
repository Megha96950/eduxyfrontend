import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { LoginValidators } from 'src/app/shared/validators/login.validator';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',

})
export class RegisterComponent implements OnInit {

  user!: User;
  registerUserForm!: FormGroup ;
  errorMessage!: string;
  successMessage!: string;
  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.user = new User();
        this.createForm();
  }

  createForm() {

    this.registerUserForm = this.fb.group({
        emailId: ["", [Validators.required]],
        name: ["", [Validators.required]],
        phoneNumber: ["", [Validators.required]],
        password: ["" ,[Validators.required]],
        confirmPassword: ["", [Validators.required]],
        role: ["",[Validators.required]]

    });
   // this.registerUserForm.get('confirmPassword').setValidators([Validators.required,LoginValidators.confirmPassword(this.registerUserForm.get('password'))]);
  // this.registerUserForm.get('confirmPassword')?.setValidators([Validators.required,LoginValidators.confirmPassword(this.registerUserForm.get)]);
}



registerUser() {
  this.errorMessage = 'null';
  this.successMessage = 'null';
  this.user = this.registerUserForm.value as User;

  this.registerService.registerCustomer(this.user)
      .subscribe(
          message => {
              this.successMessage = message;
              this.registerUserForm.reset();
          }
          , error => this.errorMessage = <any>error
      )

}
}
