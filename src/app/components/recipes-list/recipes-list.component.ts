import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: any[] = [];
  @Output() recipeSelected = new EventEmitter<number>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  onRecipeSelected(recipeId: number) {
    this.recipeSelected.emit(recipeId);
  }
}
