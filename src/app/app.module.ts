import { RecipesSevice } from './../services/recipes';
import { ShoppingListService } from './../services/shopping-list';
import { TabsPage } from './../pages/tabs/tabs';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { RecipesPage } from './../pages/recipes/recipes';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { RecipePage } from './../pages/recipe/recipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    ShoppingListPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    ShoppingListPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesSevice
  ]
})
export class AppModule {}
