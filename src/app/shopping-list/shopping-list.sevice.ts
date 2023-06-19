import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService{

    private ingredients: Ingredient[] = [];

    ingredientsChanged = new Subject<Ingredient[]>();

    constructor(){}

    getIngredients(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}