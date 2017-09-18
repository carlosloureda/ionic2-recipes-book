import { AuthService } from './auth';
import { Ingredient } from './../models/ingredient';
import { Recipe } from './../models/recipe';
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

@Injectable()
export class RecipesSevice {

    private recipes: Recipe[] = [];

    constructor(
        private authService: AuthService, 
        private http: Http
    ) {}

    addRecipe(title: string, 
            description: string, 
            difficulty: string, 
            ingredients: Ingredient[]) {
        
        this.recipes.push(new Recipe(
            title, description, difficulty, ingredients
        ));
    }
    getRecipes() {
        return this.recipes.slice();
    }
    updateRecipe(index: number,
        title: string, 
        description: string, 
        difficulty: string, 
        ingredients: Ingredient[]) {
    
        this.recipes[index] = new Recipe(
            title, description, difficulty, ingredients
        ); 
    }
    removeRecipe(index: number) {
        this.recipes.splice(index,  1);
    }

    storeList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        // returns an Observable, we need to subscribe
        return this.http.put(
            'https://ionic2-recipe-book-ff811.firebaseio.com/' + 
            userId + '/recipes.json?auth=' + token,
            this.recipes
        ).map( (response: Response) => {
            return response.json();
        });
    }

    fetchList(token: string) {
        const userId = this.authService.getActiveUser().uid;
        // returns an Observable, we need to subscribe
        return this.http.get(
            'https://ionic2-recipe-book-ff811.firebaseio.com/' + 
            userId + '/recipes.json?auth=' + token
        )
        .map( (response: Response) => {
            const recipes: Recipe[] = response.json() ? response.json() : [];
            // if we previously save a recipe withour ingredients we will have problems so we fix it
            for (let item of recipes) {
                if ( ! item.hasOwnProperty('ingredients') ) {
                    item.ingredients = [];
                }
            }
            return recipes;
        })
        .do( (recipes: Recipe[]) => {
            if (this.recipes) {
                this.recipes = recipes;
            } else {
                this.recipes = [];
            }
        });
    }
}