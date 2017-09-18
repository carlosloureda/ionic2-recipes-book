import { AuthService } from './auth';
import { Http, Response } from '@angular/http';
import { Ingredient } from './../models/ingredient';
import { Injectable } from "@angular/core";

import 'rxjs/Rx';

//TODO: Implement _ids when going pro
@Injectable()
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

    constructor(
        private http: Http,
        private authService: AuthService
    ) {}

    addItem(name: string, amount: number) {
        this.ingredients.push(new Ingredient(name, amount));
    }
    updateItem(name: string, amount: number, originalName: string) {
        let updateSuccess: boolean = false;
        this.ingredients.forEach(function(ingredient){
            if(ingredient.name == originalName) {
                ingredient.name = name;
                ingredient.amount = amount;
                updateSuccess = true;
                return true;
            }
        });
        return updateSuccess;
    }
    addItems(items: Ingredient[]) {
        this.ingredients.push(...items);
    }
    removeItem(index: number) {
        console.log("this.ingredients before: ", this.ingredients);        
        this.ingredients.splice(index, 1);
        console.log("this.ingredients after: ", this.ingredients);
    }
    getItems() {
        return this.ingredients.slice();
    }
    
    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        // returns an Observable, we need to subscribe
        return this.http.put(
            'https://ionic2-recipe-book-ff811.firebaseio.com/' + 
            userId + '/shopping-list.json?auth=' + token,
            this.ingredients
        ).map( (response: Response) => {
            return response.json();
        });
    }

    fetchList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        // returns an Observable, we need to subscribe
        return this.http.get(
            'https://ionic2-recipe-book-ff811.firebaseio.com/' + 
            userId + '/shopping-list.json?auth=' + token
        )
        .map( (response: Response) => {
            return response.json();
        })
        .do( (ingredients: Ingredient[]) => {
            if (this.ingredients) {
                this.ingredients = ingredients;
            } else {
                this.ingredients = [];
            }
        });
    }
}