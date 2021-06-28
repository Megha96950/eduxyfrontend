import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { LoginValidators } from 'src/app/shared/validators/login.validator';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    user!: User;
    loginForm!: FormGroup;
    errorMessage!: string;
    successMessage!: string;
    tryToLogin: boolean = false;
    constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {

    }

    ngOnInit() {
        this.user= new User();
        this.createForm();

    }
    createForm() {

        this.loginForm = this.fb.group({
            emailId: [this.user.emailId, [Validators.required,LoginValidators.validateEmailId], null],
            password: [this.user.password, [Validators.required], null]
        });
    }



    login() {
        this.tryToLogin = true;
        this.errorMessage = 'null';
        this.successMessage = 'null';
        this.user = this.loginForm.value as User;
        this.loginService.login(this.user).subscribe(
            (response) => {
                this.user = response
                console.log(this.user)
                sessionStorage.setItem("user", JSON.stringify(this.user));
                sessionStorage.setItem("userType", JSON.stringify(this.user.role));
               
                this.tryToLogin = false;
                this.router.navigate(['/home']);
            },
            (error) => {
                this.tryToLogin = false;
                this.errorMessage = <any>error;
            }
        
        )
}
}