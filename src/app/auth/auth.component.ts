import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnDestroy{
    loginMode = true;
    isLoading = false;
    //error = null;
    private closeSubs: Subscription;
    @ViewChild(PlaceHolderDirective) alertCompHost: PlaceHolderDirective;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

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
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        },errorMessage => {
            //this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        });

        form.reset();
    }

    // onHandleError(){
    //     this.error = null;
    // }

    private showErrorAlert(message: string){
        const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertCompHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
        componentRef.instance.message = message;
        this.closeSubs = componentRef.instance.close.subscribe(() => {
            hostViewContainerRef.clear();
            this.closeSubs.unsubscribe();
        });
    }

    ngOnDestroy(): void {
        if(this.closeSubs){
            this.closeSubs.unsubscribe();
        }
    }
}