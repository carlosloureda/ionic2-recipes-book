import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shopping-list';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Template driven form
 * */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {

  private listItems: Ingredient[];
  constructor(private slService: ShoppingListService) {}

  private updateMode: boolean = false;
  // TODO: used while we don't use _ids as we need something to update database
  private updateOriginalName: string;

  @ViewChild('form') form;

  onAddItem(form: NgForm) {
    if (this.updateMode) {
      console.log("on item update");
      this.slService.updateItem(
        form.value.ingredientName, 
        form.value.amount,
        this.updateOriginalName
      );
    } else {
      console.log("on item add");
      this.slService.addItem(form.value.ingredientName, form.value.amount);
    }

    // console.log(form);
    form.reset();
    // refresh the list
    this.loadItems(); 
    this.updateMode = false;
  }
  // will be fired even popon cached views
  ionViewWillEnter() {
    this.loadItems();
  }

  onDeleteItem(index: number) {
    console.log("on delete item, index: ", index);
    
    this.slService.removeItem(index);
    this.loadItems();
  }

  onCheckedItem(item: Ingredient) {
    this.form.controls.ingredientName.setValue(item.name);
    this.form.controls.amount.setValue(item.amount);
    this.updateMode = true;
    this.updateOriginalName = item.name;
  }

  onCancelUpdate() {
    this.form.reset();
    this.updateMode = false;
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }

}
