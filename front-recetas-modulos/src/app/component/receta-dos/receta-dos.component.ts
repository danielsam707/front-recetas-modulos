import { Component } from '@angular/core';
import { RecipesTwoService } from '../../service/recipes-two.service';
import { Meal } from '../../models/recepeTwo.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receta-dos',
  standalone: false,
  
  templateUrl: './receta-dos.component.html',
  styleUrl: './receta-dos.component.css'
})
export class RecetaDosComponent {

  meals: Meal[] = [];
  recetaId:string = '';

  constructor(
    private mealService: RecipesTwoService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.recetaId = this.route.snapshot.paramMap.get('id')!;
    this.recetaPorId()
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

  recetaPorId() {
    this.mealService.recipeById(this.recetaId)
    .subscribe( response => {
      this.meals = this.mealService.transformMealData(response)
    }
    )
  }



}
