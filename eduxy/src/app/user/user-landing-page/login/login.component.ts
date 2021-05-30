import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
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
            emailId: [this.user.emailId, [Validators.required], null],
            password: [this.user.password, [Validators.required], null]
        });
    }



    login() {
        
    }
}