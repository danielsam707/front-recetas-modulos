import { Component, Input } from '@angular/core';
import { Recipe } from '../models/recipeData.model';

@Component({
  selector: 'app-receta',
  standalone: false,
  
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css'
})
export class RecetaComponent {

  @Input() receta!: Recipe;

}
