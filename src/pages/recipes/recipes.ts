import { DatabaseOptionsPage } from './../database-options/database-options';
import { AuthService } from './../../services/auth';
import { RecipePage } from './../recipe/recipe';
import { RecipesSevice } from './../../services/recipes';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Component } from '@angular/core';
import { 
  IonicPage, NavController, 
  NavParams, PopoverController, 
  LoadingController, AlertController 
} from 'ionic-angular';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})

export class RecipesPage {
  recipes: Recipe[];
  constructor(
    private navCtrl: NavController, 
    private recipesSevice: RecipesSevice,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {

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

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wat ...'
    }); 
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});

    popover.onDidDismiss(data => {
      if ( ! data ) {
        return;
      }
      if (data.action == 'load') {
        loading.present();
        this.authService.getActiveUser().getIdToken()
        .then(
          (token: string) => {
            this.recipesSevice.fetchList(token)
            .subscribe(
              (list: Recipe[] ) => {
                loading.dismiss();
                if (list) {
                  this.recipes = list;
                } else {
                  this.recipes = [];
                }
              },
              (error)=> {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            )
          }
        );
      } else if(data.action == 'save') {
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then(
            (token: string) => {
              this.recipesSevice.storeList(token)
              .subscribe(
                () => loading.dismiss(),
                (error)=> {
                  loading.dismiss();
                  this.handleError(error.json().error);
                }
              )
            }
          ); 
      }
    });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error ocurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
