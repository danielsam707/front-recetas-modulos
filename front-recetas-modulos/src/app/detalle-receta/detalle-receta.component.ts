import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../service/recipes.service';
import { Recipe, RecipeAttributes } from '../models/recipeData.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-receta',
  standalone: false,
  
  templateUrl: './detalle-receta.component.html',
  styleUrl: './detalle-receta.component.css'
})
export class DetalleRecetaComponent {

  recetaId!: string;
  receta!: RecipeAttributes;
  recetasUsuario$: Observable<Recipe[]>; // Observable para obtener las recetas del usuario
  isRecetaDelUsuario: boolean = false; // Bandera para saber si es la receta del usuario

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
  ) { this.recetasUsuario$ = this.recipeService.recetasUsuario$;}

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.recetaId = this.route.snapshot.paramMap.get('id')!;
    console.log('Receta ID:', this.recetaId);
    this.obtenerReceta(this.recetaId)
    console.log(this.recetasUsuario$);
    

  }

  
  obtenerReceta(id: string){
    this.recipeService.getRecipeById(id)
    .subscribe(
      response => {
        
        this.receta = response.data.attributes;
        console.log(this.receta);

        // Comparar el id de la receta con las recetas del usuario
        this.recetasUsuario$.subscribe(recetas => {
        this.isRecetaDelUsuario = recetas.some(recipe => recipe.id.toString() === id); // Verifica si el id coincide
        });

      }
    )
  }

  // Aquí puedes agregar las funciones para editar y eliminar la receta, por ejemplo:
  editarReceta() {
    console.log('Editar receta con ID:', this.recetaId);
    // Implementar la lógica de edición
  }

  eliminarReceta() {
    console.log('Eliminar receta con ID:', this.recetaId);
    // Implementar la lógica de eliminación
  }
}
