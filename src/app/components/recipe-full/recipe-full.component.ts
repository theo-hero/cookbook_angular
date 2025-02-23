import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RecipeService } from 'src/recipe.service';

@Component({
  selector: 'app-recipe-full',
  templateUrl: './recipe-full.component.html',
  styleUrls: ['./recipe-full.component.css']
})
export class RecipeFullComponent {
  @Input() recipeId: number | null = null;
  @Output() closeWindow = new EventEmitter<void>();
  recipe: any = null;

  ngOnInit(): void {
    if (this.recipeId !== null) {
      this.recipeService.getRecipeById(this.recipeId).subscribe(data => {
        this.recipe = data;
      });
    } else {
      this.recipe = null;
    }
  }

  constructor(private recipeService: RecipeService) {}

  closeTheWindow(event: MouseEvent) {
    event.stopPropagation();
    this.closeWindow.emit();
  }

  showOptionsMenu = false;

  toggleOptionsMenu(event: MouseEvent): void {
    event.stopPropagation(); // Prevents the click from propagating to the document
    this.showOptionsMenu = !this.showOptionsMenu;
  }

  editRecipe(): void {
    console.log('Edit recipe functionality will be implemented here.');
    this.showOptionsMenu = false; // Close the menu after selection
  }

  deleteRecipe(): void {
    console.log('Delete recipe functionality will be implemented here.');
    this.showOptionsMenu = false; // Close the menu after selection
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    this.showOptionsMenu = false;
  }
}
