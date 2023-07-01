import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent  implements OnInit, OnDestroy{
    collapsed = true;
    isAuthenticated = false;
    private userSubs: Subscription;

    constructor(private recipeService: RecipeService,
                private authService: AuthService) {}

    ngOnInit(): void {
        this.userSubs = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        })
    }

    onSaveData(){
        this.recipeService.storeRecipes();
    }

    onFetchData(){
        this.recipeService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.userSubs.unsubscribe();
    }
}