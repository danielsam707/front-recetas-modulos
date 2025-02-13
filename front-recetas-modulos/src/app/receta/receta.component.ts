import { Component, Input } from '@angular/core';
import { Recipe, RecipeAttributes } from '../models/recipeData.model';
import { RecipesService } from '../service/recipes.service';
import { TranslationService } from '../service/translation.service';


@Component({
  selector: 'app-receta',
  standalone: false,
  
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export class RecetaComponent {

  @Input() receta!: Recipe;

  constructor(
    private recipeService: RecipesService,
    private translationService: TranslationService,
  ) {}


  t(key: string) {
    return this.translationService.translate(key);
  }

}
