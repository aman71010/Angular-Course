import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.sevice';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('form') slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  selectedIngredient: Ingredient;
  

  constructor(private shoppingListService: ShoppingListService){}

  onSubmit(){
    const ingName = this.slForm.value.name;
    const ingAmount = this.slForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if(this.editMode){
      this.shoppingListService.updateIngredients(this.editedItemIndex, newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset(); 
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.selectedIngredient = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount
        });
      }
    )
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
