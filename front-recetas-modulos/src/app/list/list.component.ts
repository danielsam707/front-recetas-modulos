import { Component } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { Category, Recipe, CategoryRelationships } from '../models/recipeData.model';

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  // categoria: string = '';

  listaRecetas: Recipe[] = [];
  listaCategorias: Category[] = [];
  

  constructor(
    private recipeService: RecipesService
  ){}


  ngOnInit() {
    this.listarRecetas()
    this.listarCategorias()
  }
  listarRecetas() {
    this.recipeService.getAllRecipes()?.subscribe(
      response => {
        console.log('Esta es la lista de recetas', response);
        this.listaRecetas = response.data;
      }
    )
  }

  listarCategorias() {
    this.recipeService.getAllCategory()?.subscribe(
      response => {
        console.log('Esta es la lista de Categorias', response);
        this.listaCategorias = response.data;
      }
    )
  }

  filtrarPorCategoria(categoriaId: number) {
    // Filtramos la categoría para obtener las recetas de esa categoría
    // const categoriaSeleccionada = this.listaCategorias.find(categoria => categoria.id === categoriaId);
    this.recipeService.getRecipesByCategory(categoriaId)
    .subscribe(
      response => {
        console.log('respuesta' ,response)
        const lista = response.data.relationships.recipes;
        console.log('recetas de categoria', lista)
        this.listaRecetas = response.data.relationships.recipes;
      }
    )


        // Accedemos a las recetas de esa categoría
    

    console.log('Recetas de la categoría seleccionada:', this.listaRecetas);
  }

}
