import { Component, OnInit } from '@angular/core';
import { 
  IonicPage, NavController, NavParams, ActionSheetController, AlertController 
} from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})

// reactive aproach for the form
export class EditRecipePage implements OnInit{
  
  mode: string;
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(
    public navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {
  }

  ngOnInit(): void {
    this.mode = this.navParams.get('mode');
    this.initialiazeForm();
  }

  onSubmit() {
    console.log("The form is: ", this.recipeForm);    
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        }, 
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {

          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertController.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(
              new FormControl(data.name, Validators.required)
            );
          }
        }
      ]
    });
  }

  private initialiazeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }
}
