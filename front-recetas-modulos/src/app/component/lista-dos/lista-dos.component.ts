import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesTwoService } from '../../service/recipes-two.service';
import { Areas, Categories, Meal, MealBasic,MealsResponse } from '../../models/recepeTwo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-dos',
  standalone: false,
  
  templateUrl: './lista-dos.component.html',
  styleUrl: './lista-dos.component.css'
})
export class ListaDosComponent {

  listaCategorias: Categories[] = [];
  listaAreas: Areas[] = [];
  listaRecetas: MealBasic[] = [];
  nombreFiltro: string = ''
  titulo:string = `Lista de recetas`;
  idRecetaAleatoria: string = '';
  recetaAleatoria!: any;


  constructor(
    private http: HttpClient,
    private recipeService: RecipesTwoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerCategorias()
    this.obtenerAreas()
    this.recetasPorCategorias('Vegetarian')
  }

  obtenerCategorias() {
    this.recipeService.getCategories().subscribe(
      response => {
        this.listaCategorias = response
      }
    )
  }

  recetasPorCategorias(name: string) {
    this.recipeService.recipeByCategory(name).subscribe(
      response => {
        this.listaRecetas = response;
        this.nombreFiltro = name;
        this.titulo =  `Lista de recetas filtradas por: ${this.nombreFiltro}`;
      }
    )
  }

  obtenerAreas() {
    this.recipeService.getArea()
    .subscribe( response => {
      this.listaAreas = response;
    })
  }

  recetasPorArea(area: string) {
    this.recipeService.recipeByArea(area)
    .subscribe( response => {
      this.listaRecetas = response;
    })
  }

  obtenerRecetaAleatoria() {
    
    this.recipeService.getMeal().subscribe(
      response => {
        this.recetaAleatoria = this.recipeService.transformMealData(response);
        console.log('Esta es la receta transformada', this.recetaAleatoria)
        console.log('Esto es el id de la receta', this.recetaAleatoria[0].idMeal);
        this.idRecetaAleatoria = this.recetaAleatoria[0].idMeal;

         // Redirigir al componente de detalles pasando el id de la receta aleatoria
      this.router.navigate([`/receta-api/${this.idRecetaAleatoria}`]);
      },
      error => {
        console.error('Error al obtener las comidas:', error);
      }
    );
  }





  

}
