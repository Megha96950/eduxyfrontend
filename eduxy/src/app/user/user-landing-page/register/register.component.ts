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
        emailId: [this.user.emailId, [Validators.required]],
        name: [this.user.name, [Validators.required]],
        phoneNumber: [this.user.phoneNumber, [Validators.required, LoginValidators.validatePhoneNumber]],
        password: [this.user.password, [Validators.required, LoginValidators.validatePassword]],
        confirmPassword: ["", [Validators.required]],
        role: [this.user.role,[Validators.required]]

    });
   // this.registerUserForm.get('confirmPassword').setValidators([Validators.required,LoginValidators.confirmPassword(this.registerUserForm.get('password'))]);
  // this.registerUserForm.get('confirmPassword')?.setValidators([Validators.required,LoginValidators.confirmPassword(this.registerUserForm.get)]);
}
}
