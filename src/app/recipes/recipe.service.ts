import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.sevice";

@Injectable()
export class RecipeService{
    private recipes: Recipe[] = [
        new Recipe(
            'Banana Banana Bread', 
            "This banana bread recipe creates the most delicious, moist loaf with loads of banana flavor. Why compromise the banana flavor? Friends and family love my recipe and say it's by far the best! It tastes wonderful toasted. Enjoy!", 
            'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fpublic-assets.meredithcorp.io%2F5d85474013c270d16accdcca47f84297%2F168743755530420230621_144224.jpg&q=60&c=sc&orient=true&poi=auto&h=512',
            [
                new Ingredient('Banana', 6),
                new Ingredient('Flour', 2)
            ]
        ),
        new Recipe(
            'Chickpea Tikka Masala', 
            'Chickpea tikka masala is a classic Indian curry where chickpeas are cooked in a flavorful creamy sauce. Serve over basmati rice or with naan.', 
            'https://www.allrecipes.com/thmb/53SMspkec_Suf9NLSMRucREQyTU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7497387-chickpea-tikka-masala-ddmfs_4x3_1791-e0838138030a4b55ac7340027bc2b47f.jpg',
            [
                new Ingredient('Chickspeas', 30),
                new Ingredient('tomato', 4),
                new Ingredient('onion', 3)
            ]
        ),
        new Recipe(
            'Smashed Peach and Poblano Grilled Cheese', 
            'For a spicy-sweet take on grilled cheese, layer roasted poblanos and smashed peach slices with Cheddar and bacon.', 
            'https://www.allrecipes.com/thmb/lnuLJtbb3JfpYUD_7TD0nKGltFQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7506229-smashed-peach-and-poblano-grilled-cheese-JD-4x3-44640-2d2ec07f67b144ac94d7aff902965de6.jpg',
            [
                new Ingredient('Bread', 4),
                new Ingredient('cheese', 3),
                new Ingredient('Bacon', 5),
            ]
        )
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