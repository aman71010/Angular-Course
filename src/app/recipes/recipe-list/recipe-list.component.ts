import { Component, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Test Name', 'This is a Test Description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32bI8SjvfpUTfMGwBj1zF1aWNVCQFbLOLUQ&usqp=CAU'),
    new Recipe('Test Name2', 'This is a Test Description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32bI8SjvfpUTfMGwBj1zF1aWNVCQFbLOLUQ&usqp=CAU'),
    new Recipe('Test Name3', 'This is a Test Description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32bI8SjvfpUTfMGwBj1zF1aWNVCQFbLOLUQ&usqp=CAU'),
    new Recipe('Test Name4', 'This is a Test Description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT32bI8SjvfpUTfMGwBj1zF1aWNVCQFbLOLUQ&usqp=CAU')
  ];

  onRecipeSelected(recipeItem: Recipe){
    this.recipeWasSelected.emit(recipeItem);
  }
}
