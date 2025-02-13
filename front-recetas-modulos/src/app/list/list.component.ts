import { Component } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { Category, Recipe, CategoryRelationships } from '../models/recipeData.model';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../models/usuario.model';
import { Router, RouterLink } from '@angular/router';
import { TranslationService } from '../service/translation.service';
import es from '../../../public/i18n/es.json';
import en from '../../../public/i18n/en.json'
@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  user!: Usuario;
  nombreFiltro: string = ''
  titulo:string = '';

  

  listaRecetas: Recipe[] = [];
  listaBoton: Recipe[] = [];
  listaCategorias: Category[] = [];
  recetasUsuario: Recipe[] = [];

  //paginacion
  paginatedRecetas: Recipe[] = []; // Recetas que se mostrarán en la página actual
  currentPage = 1;
  totalPages = 0;
  itemsPerPage = 9;  // Número de recetas por página

  successMessage: string = ''; // Mensaje de creacion exitosa o no


  constructor(
    private recipeService: RecipesService,
    private authService: AuthService,
    private router: Router,
    private translationService: TranslationService,

  ){}


  ngOnInit() {


    
    this.titulo = this.t('MY_RECIPES')
    
    this.listarRecetas()
    this.listarCategorias()
    this.datosUsuario()
    
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state as { successMessage: string };
    // this.successMessage = state?.successMessage || '';

    this.successMessage = '¡Receta guardada exitosamente!';
    
    
    
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
        this.paginateRecetas();  // Llamar a la función de paginación después de obtener las recetas
        
        
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
        this.titulo = `${this.t('FILTERED_RECIPES_LIST')} ${this.nombreFiltro}`;
        this.reiniciarPaginate()
        this.paginateRecetas();  // Llamar a la función de paginación después de obtener las recetas

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
    this.titulo = this.t('MY_RECIPES')
    this.reiniciarPaginate()
    this.paginateRecetas();  // Llamar a la función de paginación después de obtener las recetas
    
  }
  

  datosUsuario() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  
  listarTodas() {
    this.listaRecetas = this.listaBoton;
    this.titulo = this.t('ALL_RECIPES')
    this.paginateRecetas();  // Llamar a la función de paginación después de obtener las recetas
  }

  // Función para dividir las recetas en páginas
  paginateRecetas() {
    this.totalPages = Math.ceil(this.listaRecetas.length / this.itemsPerPage);  // Total de páginas
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRecetas = this.listaRecetas.slice(startIndex, endIndex);  // Obtener recetas para la página actual
  }

  // Navegar a la página siguiente
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateRecetas();  // Actualizar las recetas visibles para la nueva página
    }
  }

  // Navegar a la página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateRecetas();  // Actualizar las recetas visibles para la nueva página
    }
  }

  reiniciarPaginate() {
    this.currentPage = 1;
    this.totalPages = 0;
    this.itemsPerPage = 9;  // Número de recetas por página
  }


  t(key: string) {
    return this.translationService.translate(key);
  }

  changeLanguage(lang: 'es' | 'en') {
    this.translationService.setLanguage(lang);
  }

}
