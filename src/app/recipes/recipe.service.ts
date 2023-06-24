import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.sevice";

@Injectable()
export class RecipeService{
    private recipes: Recipe[] = [
        new Recipe(
            'Test Name', 
            'This is a Test Description', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32bI8SjvfpUTfMGwBj1zF1aWNVCQFbLOLUQ&usqp=CAU',
            [
                new Ingredient('dummy1', 2),
                new Ingredient('dummy2', 4)
            ]
        ),
        new Recipe(
            'Test Name 2', 
            'This is a Test Description', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32bI8SjvfpUTfMGwBj1zF1aWNVCQFbLOLUQ&usqp=CAU',
            [
                new Ingredient('dummy1', 1),
                new Ingredient('dummy2', 7)
            ]
        ),
        new Recipe(
            'Test Name 3', 
            'This is a Test Description 3', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32bI8SjvfpUTfMGwBj1zF1aWNVCQFbLOLUQ&usqp=CAU',
            [
                new Ingredient('dummy1', 2),
                new Ingredient('dummy2', 5)
            ]
        ),
        new Recipe(
            'Test Name 4', 
            'This is a Test Description', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32bI8SjvfpUTfMGwBj1zF1aWNVCQFbLOLUQ&usqp=CAU',
            [
                new Ingredient('dummy1', 2),
                new Ingredient('dummy2', 4)
            ]
        ),
    ];

    recipesChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService){}

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
}