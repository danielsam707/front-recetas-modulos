import { Component } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { Category, Recipe, CategoryRelationships } from '../models/recipeData.model';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../models/usuario.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  user!: Usuario;
  nombreFiltro: string = ''
  titulo:string = `Mis recetas`;

  listaRecetas: Recipe[] = [];
  listaBoton: Recipe[] = [];
  listaCategorias: Category[] = [];
  recetasUsuario: Recipe[] = [];

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
        this.listaBoton = response.data;
        

        if (this.user && this.user.name) {
          this.filtarPorUsuario();  // Filtrar las recetas de este usuario
        }
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
        console.log('respuesta de filtro por categoria' ,response)
        const lista = response.data.relationships.recipes;
        console.log('recetas de categoria', lista)
        this.listaRecetas = response.data.relationships.recipes;
        this.nombreFiltro = response.data.attributes.name
        this.titulo = `Lista de recetas filtrado por: ${this.nombreFiltro}`
      }
    )
    console.log('Recetas de la categoría seleccionada:', this.listaRecetas);
  }

  filtarPorUsuario() {
    let name = this.user.name.toString();

    this.recetasUsuario = this.listaRecetas.filter(recipe => recipe.attributes.author === name);
    this.listaRecetas = this.recetasUsuario;
    this.recipeService.setRecetasUsuario(this.recetasUsuario);
    console.log('Esta es la lista del usuario',this.recetasUsuario);
    this.titulo = 'Mis recetas'
    
  }
  

  datosUsuario() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  
  listarTodas() {
    this.listaRecetas = this.listaBoton;
    this.titulo = 'Todas las recetas'
  }

}
