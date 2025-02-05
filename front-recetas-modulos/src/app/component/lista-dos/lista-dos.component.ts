import { Component } from '@angular/core';
import { RecipesTwoService } from '../../service/recipes-two.service';
import { Categories, Areas, MealBasic } from '../../models/recepeTwo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-dos',
  standalone: false,
  templateUrl: './lista-dos.component.html',
  styleUrls: ['./lista-dos.component.css']
})
export class ListaDosComponent {

  listaCategorias: Categories[] = [];
  listaAreas: Areas[] = [];
  listaRecetas: MealBasic[] = [];
  paginatedRecetas: MealBasic[] = []; // Recetas que se mostrarán en la página actual
  nombreFiltro: string = '';
  titulo: string = 'Lista de recetas';
  currentPage = 1;
  totalPages = 0;
  itemsPerPage = 8;  // Número de recetas por página

  constructor(
    private recipeService: RecipesTwoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerCategorias();
    this.obtenerAreas();
    this.recetasPorCategorias('Vegetarian');  // Cargar recetas al inicio
  }

  obtenerCategorias() {
    this.recipeService.getCategories().subscribe(response => {
      this.listaCategorias = response;
    });
  }

  obtenerAreas() {
    this.recipeService.getArea().subscribe(response => {
      this.listaAreas = response;
    });
  }

  // Obtener recetas por categoría
  recetasPorCategorias(name: string) {
    this.nombreFiltro = name;
    this.titulo = `Lista de recetas filtradas por: ${this.nombreFiltro}`;
    this.recipeService.recipeByCategory(name).subscribe(response => {
      this.listaRecetas = response;
      this.paginateRecetas();  // Llamar a la función de paginación después de obtener las recetas
    });
  }

  // Obtener recetas por área
  recetasPorArea(area: string) {
    this.nombreFiltro = area;
    this.titulo = `Lista de recetas filtradas por área: ${this.nombreFiltro}`;
    this.recipeService.recipeByArea(area).subscribe(response => {
      this.listaRecetas = response;
      this.paginateRecetas();  // Llamar a la función de paginación después de obtener las recetas
    });
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

  // Obtener receta aleatoria
  obtenerRecetaAleatoria() {
    this.recipeService.getMeal().subscribe(response => {
      const recetaAleatoria = this.recipeService.transformMealData(response);
      const idRecetaAleatoria = recetaAleatoria[0].idMeal;

      // Redirigir al componente de detalles pasando el id de la receta aleatoria
      this.router.navigate([`/receta-api/${idRecetaAleatoria}`]);
    });
  }
}
