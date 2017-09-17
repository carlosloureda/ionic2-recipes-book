import { RecipePage } from './../recipe/recipe';
import { RecipesSevice } from './../../services/recipes';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})

export class RecipesPage {
  recipes: Recipe[];
  constructor(private navCtrl: NavController, private recipesSevice: RecipesSevice) {

  }
  ionViewWillEnter(){
    this.recipes = this.recipesSevice.getRecipes();
  }
  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    console.log("the recipe to be loaded is: ", recipe);
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index})
  }
}
