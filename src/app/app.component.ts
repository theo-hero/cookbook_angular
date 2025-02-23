import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  recipeWindowIsVisible = false;
  selectedRecipeId: number | null = null;

  showFullRecipe(recipeId: number) {
    this.selectedRecipeId = recipeId;
    this.recipeWindowIsVisible = true;
  }

  closeFullRecipe() {
    this.recipeWindowIsVisible = false;
    this.selectedRecipeId = null;
  }
}
