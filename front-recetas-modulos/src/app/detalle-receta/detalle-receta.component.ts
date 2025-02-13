import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../service/recipes.service';
import { Recipe, RecipeAttributes } from '../models/recipeData.model';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { TranslationService } from '../service/translation.service';

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
  
//----------------------------------------------------------------------------------------------------------------

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private translationService: TranslationService,
    
  ) { this.recetasUsuario$ = this.recipeService.recetasUsuario$;
  }

//----------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.recetaId = this.route.snapshot.paramMap.get('id')!;
    console.log('Receta ID:', this.recetaId);
    this.obtenerReceta(this.recetaId)
    
  }


//----------------------------------------------------------------------------------------------------------------

  obtenerReceta(id: string){
    this.recipeService.getRecipeById(id)
    .subscribe(
      response => {
        
        this.receta = response.data.attributes;
        console.log('Esta es la receta completa',this.receta);

        // Comparar el id de la receta con las recetas del usuario
        this.recetasUsuario$.subscribe(recetas => {
          console.log('estas son las recetas del servicio', recetas)
        this.isRecetaDelUsuario = recetas.some(recipe => recipe.id.toString() === id); // Verifica si el id coincide
        });

      }
    )
  }


//----------------------------------------------------------------------------------------------------------------

  // Aquí puedes agregar las funciones para editar y eliminar la receta, por ejemplo:
  editarReceta() {
    console.log('Editar receta con ID:', this.recetaId);
    // Implementar la lógica de edición
  }


//----------------------------------------------------------------------------------------------------------------
  eliminarReceta() {
    console.log('id en componente', this.recetaId)
    console.log(this.recetaId)
    this.recipeService.deleteRecipe(this.recetaId).subscribe(
      response => {
        console.log('Receta eliminada con éxito:', response);
      
    })
    this.router.navigate(['']);
  }
  

  t(key: string) {
    return this.translationService.translate(key);
  }
  
}
