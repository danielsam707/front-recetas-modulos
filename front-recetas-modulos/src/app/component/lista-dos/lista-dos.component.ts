import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesTwoService } from '../../service/recipes-two.service';
import { Categories, MealBasic } from '../../models/recepeTwo.model';

@Component({
  selector: 'app-lista-dos',
  standalone: false,
  
  templateUrl: './lista-dos.component.html',
  styleUrl: './lista-dos.component.css'
})
export class ListaDosComponent {

  listaCategorias: Categories[] = [];
  listaRecetas: MealBasic[] = [];


  constructor(
    private http: HttpClient,
    private recipeService: RecipesTwoService
  ) {}

  ngOnInit() {
    this.obtenerCategorias()
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
      }
    )
  }





  

}
