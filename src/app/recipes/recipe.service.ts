import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.sevice";

@Injectable()
export class RecipeService{
    private recipes: Recipe[] = [];

    recipesChanged = new Subject<Recipe[]>();

    constructor(
        private shoppingListService: ShoppingListService,
        private http: HttpClient
    ){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    storeRecipes(){
        this.http.put('https://ng-food-shop-app-default-rtdb.firebaseio.com/recipes.json', this.getRecipes())
        .subscribe(res => console.log(res));
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-food-shop-app-default-rtdb.firebaseio.com/recipes.json').pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return { 
                        ...recipe,
                        ingredients: recipe.ingredients? recipe.ingredients: []
                    };
                })
            }), 
            tap(recipes => {
                this.setRecipes(recipes);
            })
        );
    }
}