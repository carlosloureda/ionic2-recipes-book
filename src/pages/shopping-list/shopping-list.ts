import { DatabaseOptionsPage } from './../database-options/database-options';
import { AuthService } from './../../services/auth';
import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shopping-list';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';

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
  constructor(
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {}

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
            this.slService.fetchList(token)
            .subscribe(
              (list: Ingredient[] ) => {
                loading.dismiss();
                if (list) {
                  this.listItems = list;
                } else {
                  this.listItems = [];
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
              this.slService.storeList(token)
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

  private loadItems() {
    this.listItems = this.slService.getItems();
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
