import { Component } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { Category, Recipe, CategoryRelationships } from '../models/recipeData.model';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  user!: Usuario;

  listaRecetas: Recipe[] = [];
  listaCategorias: Category[] = [];
  

  constructor(
    private recipeService: RecipesService,
    private authService: AuthService,

  ){}


  ngOnInit() {
    this.listarRecetas()
    this.listarCategorias()
    this.datosUsuario()
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
    this.recipeService.getRecipesByCategory(categoriaId)
    .subscribe(
      response => {
        console.log('respuesta' ,response)
        const lista = response.data.relationships.recipes;
        console.log('recetas de categoria', lista)
        this.listaRecetas = response.data.relationships.recipes;
      }
    )
    console.log('Recetas de la categoría seleccionada:', this.listaRecetas);
  }

  filtarPorUsuario() {
    let name = this.user.name.toString();

    this.listaRecetas = this.listaRecetas.filter(recipe => recipe.attributes.author === name);
  }
  

  datosUsuario() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  

}
