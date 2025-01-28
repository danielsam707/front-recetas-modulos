import { Component } from '@angular/core';
import { RecipesService } from '../service/recipes.service';

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  constructor(
    private recipes: RecipesService
  ){}

  listar() {
    this.recipes.getAllRecipes()?.subscribe(
      response => {
        console.log('Esta es la lista de recetas', response);
      }
    )
  }

}
