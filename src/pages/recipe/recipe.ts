import { RecipesSevice } from './../../services/recipes';
import { ShoppingListService } from './../../services/shopping-list';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Recipe } from './../../models/recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})

export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private slService: ShoppingListService,
    private recipesService: RecipesSevice
  ) {
  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onAddIngredients() {
    this.slService.addItems(this.recipe.ingredients);
  }

  onEditRecipe() {
    console.log("On edit recipe: ", this.recipe);
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
