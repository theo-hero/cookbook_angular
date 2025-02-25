import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeService } from 'src/recipe.service';

interface Ingredient {
  name: string;
  customName?: string;
  quantity: number | null;
  unit: string;
}

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent {
  @Input() recipeToEdit: any = null; // Optional input for editing an existing recipe
  @Output() closeWindow = new EventEmitter<void>();
  @Output() recipeUpdated = new EventEmitter<any>();

  ingredientOptions: string[] = [];
  unitOptions: string[] = [];

  recipe = {
    id: null,
    title: '',
    description: '',
    instructions: '',
    ingredients: [] as Ingredient[],
    imageURL: ''
  };

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getUnits().subscribe(
      (response) => (this.unitOptions = response),
      (error) => console.error('Error fetching unit options:', error)
    );

    this.recipeService.getIngredients().subscribe(
      (response) => (this.ingredientOptions = response),
      (error) => console.error('Error fetching ingredient options:', error)
    );

    if (this.recipeToEdit) {
      this.recipe = {
        ...this.recipeToEdit,
        ingredients: this.recipeToEdit.ingredients.map((ing: any) => ({
          name: ing.ingredientName,
          customName: '',
          quantity: ing.quantity,
          unit: ing.unitName
        }))
      };
    }
  }

  addIngredient(): void {
    this.recipe.ingredients.push({ name: '', customName: '', quantity: null, unit: '' });
  }

  removeIngredient(index: number): void {
    this.recipe.ingredients.splice(index, 1);
  }

  closeTheWindow(event: MouseEvent): void {
    event.stopPropagation();
    this.closeWindow.emit();
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const recipeDTO = {
        id: this.recipe.id,
        title: this.recipe.title,
        description: this.recipe.description,
        instruction: this.recipe.instructions,
        img_url: this.recipe.imageURL || '',
        ingredients: this.recipe.ingredients.map((ingredient: Ingredient) => ({
          quantity: ingredient.quantity,
          unitName: ingredient.unit,
          ingredientName: ingredient.name || ingredient.customName
        }))
      };

      if (this.recipe.id) {
        this.recipeService.updateRecipe(this.recipe.id, recipeDTO).subscribe(
          (response) => {
            console.log('Recipe updated successfully:', response);
            alert('Рецепт был обновлён!');
            this.recipeUpdated.emit(response);
            this.closeWindow.emit();
          },
          (error) => console.error('Error updating recipe:', error)
        );
      } else {

        this.recipeService.postRecipe(recipeDTO).subscribe(
          (response) => {
            console.log('Recipe created successfully:', response);
            alert('Рецепт был сохранён!');
            this.recipe.ingredients = [];
            form.reset();
          },
          (error) => console.error('Error creating recipe:', error)
        );
      }
    } else {
      alert('Пожалуйста, заполните все необходимые поля');
    }
  }
}
