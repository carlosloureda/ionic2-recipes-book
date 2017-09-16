import { Ingredient } from './../models/ingredient';

//TODO: Implement _ids when going pro
export class ShoppingListService {
    private ingredients: Ingredient[] = [];

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
        this.ingredients.slice(index, 1);
    }
    getItems() {
        return this.ingredients.slice();
    }
}