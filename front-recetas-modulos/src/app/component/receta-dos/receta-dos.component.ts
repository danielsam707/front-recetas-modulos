import { Component } from '@angular/core';
import { RecipesTwoService } from '../../service/recipes-two.service';
import { Meal } from '../../models/recepeTwo.model';

@Component({
  selector: 'app-receta-dos',
  standalone: false,
  
  templateUrl: './receta-dos.component.html',
  styleUrl: './receta-dos.component.css'
})
export class RecetaDosComponent {

  meals: Meal[] = [];

  constructor(private mealService: RecipesTwoService ) {}

  ngOnInit() {
    this.loadMeals()
  }

  loadMeals(): void {
    this.mealService.getMeal().subscribe(
      response => {
        this.meals = this.mealService.transformMealData(response);
        console.log(this.meals);  // Imprime las comidas obtenidas
      },
      error => {
        console.error('Error al obtener las comidas:', error);
      }
    );
  }

}
