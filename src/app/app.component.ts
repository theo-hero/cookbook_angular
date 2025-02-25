import { Component } from '@angular/core';
import { RecipeService } from 'src/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  recipeWindowIsVisible = false;
  selectedRecipeId: number | null = null;
  createRecipeWindowIsVisible = false;
  recipes: any[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  showFullRecipe(recipeId: number) {
    this.selectedRecipeId = recipeId;
    this.recipeWindowIsVisible = true;
  }

  closeFullRecipe() {
    this.recipeWindowIsVisible = false;
    this.selectedRecipeId = null;
  }

  showCreateRecipe() {
    this.createRecipeWindowIsVisible = true;
  }

  closeCreateRecipe() {
    this.createRecipeWindowIsVisible = false;
  }

  deleteEntry(recipeId: number) {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      () => {
        console.log('Recipe deleted successfully.');
        this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
        if (this.selectedRecipeId === recipeId) {
          this.closeFullRecipe();
        }
      },
      (error) => {
        console.error('Error deleting recipe:', error);
      }
    );
  }
}
