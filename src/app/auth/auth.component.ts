import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { User } from "./user.model";

import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
    loginMode = true;
    isLoading = false;
    error = null;
    userSubs: Subscription;
    user: User

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.userSubs = this.authService.user.subscribe(user => {
            this.user = user;
        })
    }

    onSwitchMode(){
        this.loginMode = !this.loginMode;
    }

    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObser: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.loginMode){
            authObser = this.authService.logIn(email, password);
        } else{
            authObser = this.authService.signUp(email, password);
        }
        authObser.subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
        },errorMessage => {
            this.error = errorMessage;
            console.log(this.error);
            this.isLoading = false;
        });

        form.reset();
    }

    ngOnDestroy(): void {
        this.userSubs.unsubscribe();
    }
}