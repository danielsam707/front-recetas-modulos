import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../service/recipes.service';
import { Recipe, RecipeAttributes } from '../models/recipeData.model';
@Component({
  selector: 'app-detalle-receta',
  standalone: false,
  
  templateUrl: './detalle-receta.component.html',
  styleUrl: './detalle-receta.component.css'
})
export class DetalleRecetaComponent {

  recetaId!: string;
  receta!: RecipeAttributes;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
  ) { }

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    this.recetaId = this.route.snapshot.paramMap.get('id')!;
    console.log('Receta ID:', this.recetaId);
    this.obtenerReceta(this.recetaId)
    

  }

  obtenerReceta(id: string){
    this.recipeService.getRecipeById(id)
    .subscribe(
      response => {
        
        this.receta = response.data.attributes;
        console.log(this.receta);

      }
    )
  }
}
