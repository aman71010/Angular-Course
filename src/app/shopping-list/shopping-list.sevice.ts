import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredients.model";

export class ShoppingListService{

    private ingredients: Ingredient[] = [];

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    constructor(){}

    getIngredient(index: number){
        return this.ingredients[index];
    }

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

    updateIngredients(index: number, newIngredient: Ingredient){
        this.ingredients[index].name = newIngredient.name;
        this.ingredients[index].amount = newIngredient.amount;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredients(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}