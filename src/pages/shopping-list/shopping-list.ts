import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shopping-list';
import { Component } from '@angular/core';
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

  onAddItem(form: NgForm) {
    console.log("on item added");
    // console.log(form);
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    // refresh the list
    this.loadItems(); 
  }
  // will be fired even popon cached views
  ionViewWillEnter() {
    this.loadItems();
  }

  onDeleteItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  private loadItems() {
    this.listItems = this.slService.getItems();
  }

}
